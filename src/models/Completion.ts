import { Schema, model, Document, Types } from "mongoose";

export interface ICompletion extends Document {
  user: Types.ObjectId | string;
  lesson: Types.ObjectId | string;
}

const completionSchema = new Schema<ICompletion>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true }
  },
  { timestamps: true }
);

export const Completion = model<ICompletion>("Completion", completionSchema); 