import { Request, Response } from "express";
import { QuizAttempt } from "../models/QuizAttempt";

export const getUserStats = async (req: Request, res: Response) => {
  const userId = (req as any).user;

  try {
    const attempts = await QuizAttempt.find({ user: userId });

    const quizzesTaken = attempts.length;
    const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
    const avgScore = quizzesTaken > 0 ? totalScore / quizzesTaken : 0;

    res.json({ quizzesTaken, totalScore, avgScore });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user progress", error: err });
  }
};
