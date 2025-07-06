import { Schema, model, Document, Types } from "mongoose";

export interface IEnrollment extends Document {
  user: Types.ObjectId | string;
  course: Types.ObjectId | string;
  paid: boolean;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);
