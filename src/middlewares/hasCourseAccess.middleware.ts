import { Request, Response, NextFunction } from "express";
import { Enrollment } from "../models/Enrollment";

export const hasCourseAccess = async (req: Request, res: Response, next: NextFunction) => {
  const courseId = req.params.courseId || req.body.courseId;
  const userId = (req as any).user;

  const enrolled = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrolled || !enrolled.paid) {
    return res.status(403).json({ message: "Access denied. Not enrolled." });
  }
  next();
};
