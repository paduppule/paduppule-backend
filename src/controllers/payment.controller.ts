import { Request, Response } from "express";
import { initializeTransaction, verifyTransaction } from "../utils/paystack";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";

export const payForCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user;
    const { courseId, email } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    if (course.isFree || course.price === 0) {
      res.status(400).json({ message: "This course is free" });
      return;
    }

    const transaction = await initializeTransaction(email, course.price, { courseId, userId });

    res.json({
      authorization_url: transaction.authorization_url,
      reference: transaction.reference
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reference } = req.body;

    const result = await verifyTransaction(reference);
    if (result.status !== "success") {
      res.status(400).json({ message: "Payment not successful" });
      return;
    }

    const { userId, courseId } = result.metadata;

    const already = await Enrollment.findOne({ user: userId, course: courseId });
    if (!already) {
      await Enrollment.create({ user: userId, course: courseId, paid: true });
    } else {
      already.paid = true;
      await already.save();
    }

    res.json({ message: "Payment verified and access granted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
