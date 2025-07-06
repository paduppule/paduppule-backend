import { Request, Response } from "express";
import { Completion } from "../models/Completion";

export const markLessonComplete = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user;
  const { lessonId } = req.body;

  const existing = await Completion.findOne({ user: userId, lesson: lessonId });
  if (existing) {
    res.status(400).json({ message: "Already completed" });
    return;
  }

  const completed = await Completion.create({ user: userId, lesson: lessonId });
  res.status(201).json(completed);
  return;
};

export const getCompletedLessons = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user;
  const completions = await Completion.find({ user: userId }).select("lesson");
  const completedLessonIds = completions.map((c) => c.lesson);
  res.json(completedLessonIds);
  return;
}; 