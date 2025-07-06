import { Request, Response } from "express";
import { Question } from "../models/Question";

// Create question
export const createQuestion = async (req: Request, res: Response) => {
  const { text, options, correctAnswer, difficulty, category } = req.body;
  const image = req.file?.filename;

  try {
    const question = await Question.create({
      text,
      options,
      correctAnswer,
      difficulty,
      category,
      image,
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Failed to create question", error: err });
  }
};

// Get all questions (optional filter by category/difficulty)
export const getQuestions = async (req: Request, res: Response) => {
  const { category, difficulty } = req.query;

  const filter: any = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  try {
    const questions = await Question.find(filter).populate("category");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to get questions", error: err });
  }
};
