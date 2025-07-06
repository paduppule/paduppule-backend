import { Request, Response } from "express";
import { QuizAttempt } from "../models/QuizAttempt";
import { User } from "../models/user.model";

export const getGlobalLeaderboard = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    const leaderboard = await Promise.all(users.map(async (user) => {
      const attempts = await QuizAttempt.find({ user: user._id });
      const score = attempts.reduce((acc, curr) => acc + curr.score, 0);
      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        quizzesTaken: attempts.length,
        totalScore: score,
        avgScore: attempts.length ? score / attempts.length : 0
      };
    }));

    const sorted = leaderboard.sort((a, b) => b.totalScore - a.totalScore);
    res.json(sorted.slice(0, 10)); // Top 10
  } catch (err) {
    res.status(500).json({ message: "Failed to get leaderboard", error: err });
  }
};
