import { Schema, model, Document, Types } from "mongoose";

export interface ICertificate extends Document {
  user: Types.ObjectId | string;
  course: Types.ObjectId | string;
  certificateNumber: string;
  issuedDate: Date;
  completionDate: Date;
  grade?: string;
  instructor: Types.ObjectId | string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    certificateNumber: { type: String, required: true, unique: true },
    issuedDate: { type: Date, default: Date.now },
    completionDate: { type: Date, required: true },
    grade: { type: String },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

// Generate unique certificate number
certificateSchema.pre("save", async function (next) {
  if (!this.certificateNumber) {
    const count = await model("Certificate").countDocuments();
    this.certificateNumber = `CERT-${Date.now()}-${count + 1}`;
  }
  next();
});

export const Certificate = model<ICertificate>("Certificate", certificateSchema); 