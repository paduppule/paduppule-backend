import { Request, Response } from "express";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";

// Create Course (Trainer only)
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  const { title, description, price, isFree } = req.body;
  const image = req.file?.filename;
  const trainer = (req as any).user;

  try {
    const course = await Course.create({ title, description, price, isFree, image, trainer });
    res.status(201).json(course);
    return; // ensure void return
  } catch (err) {
    res.status(500).json({ message: "Failed to create course", error: err });
    return;
  }
};

// List all courses
export const getCourses = async (_req: Request, res: Response): Promise<void> => {
  const courses = await Course.find().populate("trainer", "name email");
  res.json(courses);
  return;
};

// Enroll in course (free or after Paystack payment)
export const enrollInCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.body;
  const userId = (req as any).user;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  const existing = await Enrollment.findOne({ user: userId, course: courseId });
  if (existing) {
    res.status(400).json({ message: "Already enrolled" });
    return;
  }

  const paid = course.isFree || course.price === 0;

  const enrollment = await Enrollment.create({ user: userId, course: courseId, paid });
  res.status(201).json({ message: "Enrolled", enrollment });
  return;
};
