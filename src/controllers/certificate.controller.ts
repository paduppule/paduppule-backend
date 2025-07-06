import { Request, Response } from "express";
import { Certificate } from "../models/Certificate";
import { Course } from "../models/Course";
import { Completion } from "../models/Completion";
import { Lesson } from "../models/Lesson";

export const generateCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    // Check if user is enrolled and has paid
    const enrollment = await require("../models/Enrollment").findOne({
      user: userId,
      course: courseId,
      paid: true
    });

    if (!enrollment) {
      res.status(403).json({ message: "Course not completed or not paid" });
      return;
    }

    // Get all lessons in the course
    const sections = await require("../models/Section").find({ course: courseId });
    const sectionIds = sections.map((s: any) => s._id);
    const lessons = await Lesson.find({ section: { $in: sectionIds } });
    const lessonIds = lessons.map((l: any) => l._id);

    // Check if all lessons are completed
    const completedLessons = await Completion.find({
      user: userId,
      lesson: { $in: lessonIds }
    });

    if (completedLessons.length < lessonIds.length) {
      res.status(400).json({ 
        message: "Course not fully completed",
        completed: completedLessons.length,
        total: lessonIds.length
      });
      return;
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      user: userId,
      course: courseId
    });

    if (existingCertificate) {
      res.status(400).json({ message: "Certificate already exists" });
      return;
    }

    // Generate certificate
    const certificate = await Certificate.create({
      user: userId,
      course: courseId,
      completionDate: new Date(),
      instructor: course.trainer
    });

    res.status(201).json({
      message: "Certificate generated successfully",
      certificate
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate certificate", error: err });
  }
};

export const getUserCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;
    
    const certificates = await Certificate.find({ user: userId })
      .populate("course", "title description")
      .populate("instructor", "name");

    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificates", error: err });
  }
};

export const verifyCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificateNumber } = req.params;

    const certificate = await Certificate.findOne({ certificateNumber })
      .populate("user", "name email")
      .populate("course", "title description")
      .populate("instructor", "name");

    if (!certificate) {
      res.status(404).json({ message: "Certificate not found" });
      return;
    }

    res.json({
      message: "Certificate verified",
      certificate
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to verify certificate", error: err });
  }
}; 