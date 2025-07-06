import { Schema, model, Document, Types } from "mongoose";

interface IAnswer {
  questionId: Types.ObjectId | string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface IQuizAttempt extends Document {
  user: Types.ObjectId | string;
  category: Types.ObjectId | string;
  answers: IAnswer[];
  score: number;
  completedAt: Date;
}

const quizAttemptSchema = new Schema<IQuizAttempt>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
        selectedAnswer: String,
        isCorrect: Boolean,
      },
    ],
    score: { type: Number, default: 0 },
    completedAt: Date,
  },
  { timestamps: true }
);

export const QuizAttempt = model<IQuizAttempt>("QuizAttempt", quizAttemptSchema);
