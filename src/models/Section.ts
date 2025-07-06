import { Schema, model, Document, Types } from "mongoose";

export interface ISection extends Document {
  course: Types.ObjectId | string;
  title: string;
}

const sectionSchema = new Schema<ISection>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true }
  },
  { timestamps: true }
);

export const Section = model<ISection>("Section", sectionSchema);
