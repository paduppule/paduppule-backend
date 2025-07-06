import { Schema, model, Document, Types } from "mongoose";

export interface IQuestion extends Document {
  text: string;
  category: Types.ObjectId | string;
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  image?: string;
}

const questionSchema = new Schema<IQuestion>(
  {
    text: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    image: { type: String }, // Optional image URL or path
  },
  { timestamps: true }
);

export const Question = model<IQuestion>("Question", questionSchema);
