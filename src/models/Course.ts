import { Schema, model, Document, Types } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  image?: string;
  trainer: Types.ObjectId | string;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    image: String,
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);
