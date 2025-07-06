import { Request, Response } from "express";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Completion } from "../models/Completion";
import { Certificate } from "../models/Certificate";
import { User } from "../models/user.model";

export const getInstructorDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const instructorId = (req as any).user;

    // Get instructor's courses
    const courses = await Course.find({ trainer: instructorId });
    const courseIds = courses.map(c => c._id);

    // Get total enrollments
    const totalEnrollments = await Enrollment.countDocuments({
      course: { $in: courseIds }
    });

    // Get paid enrollments
    const paidEnrollments = await Enrollment.countDocuments({
      course: { $in: courseIds },
      paid: true
    });

    // Get total revenue (assuming course prices are in the same currency)
    const enrollments = await Enrollment.find({
      course: { $in: courseIds },
      paid: true
    }).populate("course", "price");

    const totalRevenue = enrollments.reduce((sum, enrollment) => {
      return sum + (enrollment.course as any).price;
    }, 0);

    // Get completion statistics
    const courseStats = await Promise.all(
      courses.map(async (course) => {
        const sections = await require("../models/Section").find({ course: course._id });
        const sectionIds = sections.map((s: any) => s._id);
        const lessons = await require("../models/Lesson").find({ section: { $in: sectionIds } });
        const lessonIds = lessons.map((l: any) => l._id);

        const enrollments = await Enrollment.find({ course: course._id });
        const totalStudents = enrollments.length;

        const completions = await Completion.find({
          lesson: { $in: lessonIds }
        });

        const uniqueStudents = new Set(completions.map(c => c.user.toString())).size;
        const completionRate = totalStudents > 0 ? (uniqueStudents / totalStudents) * 100 : 0;

        return {
          courseId: course._id,
          courseTitle: course.title,
          totalStudents,
          completionRate: Math.round(completionRate * 100) / 100
        };
      })
    );

    // Get recent activity
    const recentEnrollments = await Enrollment.find({
      course: { $in: courseIds }
    })
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    const recentCertificates = await Certificate.find({
      instructor: instructorId
    })
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ issuedDate: -1 })
      .limit(10);

    res.json({
      overview: {
        totalCourses: courses.length,
        totalEnrollments,
        paidEnrollments,
        totalRevenue,
        conversionRate: totalEnrollments > 0 ? (paidEnrollments / totalEnrollments) * 100 : 0
      },
      courseStats,
      recentActivity: {
        enrollments: recentEnrollments,
        certificates: recentCertificates
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err });
  }
};

export const getCourseAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const instructorId = (req as any).user;
    const { courseId } = req.params;

    // Verify instructor owns the course
    const course = await Course.findOne({ _id: courseId, trainer: instructorId });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    // Get course sections and lessons
    const sections = await require("../models/Section").find({ course: courseId });
    const sectionIds = sections.map((s: any) => s._id);
    const lessons = await require("../models/Lesson").find({ section: { $in: sectionIds } });
    const lessonIds = lessons.map((l: any) => l._id);

    // Get enrollment data
    const enrollments = await Enrollment.find({ course: courseId });
    const totalEnrollments = enrollments.length;
    const paidEnrollments = enrollments.filter(e => e.paid).length;

    // Get completion data by lesson
    const lessonStats = await Promise.all(
      lessons.map(async (lesson: any) => {
        const completions = await Completion.countDocuments({ lesson: lesson._id });
        const completionRate = totalEnrollments > 0 ? (completions / totalEnrollments) * 100 : 0;

        return {
          lessonId: lesson._id,
          lessonTitle: lesson.title,
          completions,
          completionRate: Math.round(completionRate * 100) / 100
        };
      })
    );

    // Get student progress
    const studentProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const completions = await Completion.countDocuments({
          user: enrollment.user,
          lesson: { $in: lessonIds }
        });

        const progress = lessonIds.length > 0 ? (completions / lessonIds.length) * 100 : 0;

        const user = await User.findById(enrollment.user).select("name email");

        return {
          userId: enrollment.user,
          userName: user?.name,
          userEmail: user?.email,
          progress: Math.round(progress * 100) / 100,
          completedLessons: completions,
          totalLessons: lessonIds.length,
          isPaid: enrollment.paid
        };
      })
    );

    // Get monthly enrollment trends
    const monthlyEnrollments = await Enrollment.aggregate([
      { $match: { course: course._id } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      courseInfo: {
        title: course.title,
        description: course.description,
        price: course.price,
        isFree: course.isFree
      },
      overview: {
        totalEnrollments,
        paidEnrollments,
        totalLessons: lessonIds.length,
        totalSections: sections.length
      },
      lessonStats,
      studentProgress,
      monthlyEnrollments
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch course analytics", error: err });
  }
}; 