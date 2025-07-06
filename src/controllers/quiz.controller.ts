import { Request, Response } from "express";
import { Question } from "../models/Question";
import { QuizAttempt } from "../models/QuizAttempt";

import mongoose from "mongoose";

export const generateQuiz = async (req: Request, res: Response) => {
  const { category, limit = 5 } = req.query;
  try {
    const questions = await Question.aggregate([
      { $match: { category: new mongoose.Types.ObjectId(category as string) } },
      { $sample: { size: Number(limit) } }
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate quiz", error: err });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  const { answers, category } = req.body;
  const userId = (req as any).user;

  try {
    let score = 0;
    const detailedAnswers = await Promise.all(
      answers.map(async (ans: any) => {
        const question = await Question.findById(ans.questionId);
        const isCorrect = question?.correctAnswer === ans.selectedAnswer;
        if (isCorrect) score++;
        return { questionId: ans.questionId, selectedAnswer: ans.selectedAnswer, isCorrect };
      })
    );

    const attempt = await QuizAttempt.create({
      user: userId,
      category,
      answers: detailedAnswers,
      score,
      completedAt: new Date(),
    });

    res.status(201).json({ score, total: answers.length, attemptId: attempt._id });
  } catch (err) {
    res.status(500).json({ message: "Quiz submission failed", error: err });
  }
};

// Get a specific quiz attempt by ID
export const getAttempt = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cleanId = id.trim();
    const attempt = await QuizAttempt.findById(cleanId).populate("answers.questionId");
    if (!attempt) {
      res.status(404).json({ message: "Attempt not found" });
      return;
    }
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attempt", error: err });
  }
};
