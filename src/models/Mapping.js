import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true, index: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

// prevent duplicate doctor assignment to same patient
mappingSchema.index({ patient: 1, doctor: 1 }, { unique: true });

export default mongoose.model("Mapping", mappingSchema);
