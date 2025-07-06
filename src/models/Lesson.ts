import { Schema, model, Document, Types } from "mongoose";

export interface ILesson extends Document {
  section: Types.ObjectId | string;
  title: string;
  content: string;
  videoUrl?: string;
}

const lessonSchema = new Schema<ILesson>(
  {
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    title: { type: String, required: true },
    content: String,
    videoUrl: String
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>("Lesson", lessonSchema);
