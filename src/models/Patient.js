import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String },
    medicalHistory: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
