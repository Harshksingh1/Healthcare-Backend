import mongoose from "mongoose";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import Mapping from "../models/Mapping.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const assignDoctor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const { patientId, doctorId } = req.body;

  if (!mongoose.isValidObjectId(patientId) || !mongoose.isValidObjectId(doctorId)) {
    throw new ApiError(400, "Invalid IDs");
  }

  const patient = await Patient.findOne({ _id: patientId, createdBy: req.user.id });
  if (!patient) throw new ApiError(404, "Patient not found or not owned by you");

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new ApiError(404, "Doctor not found");

  const mapping = await Mapping.create({
    patient: patientId,
    doctor: doctorId,
    assignedBy: req.user.id,
  });

  res.status(201).json(mapping);
});

export const getMappings = asyncHandler(async (req, res) => {
  // only mappings for this user's patients
  const mappings = await Mapping.find()
    .populate("patient")
    .populate("doctor")
    .where("patient")
    .in((await Patient.find({ createdBy: req.user.id }, "_id")).map(p => p._id))
    .sort({ createdAt: -1 });

  res.json(mappings);
});

export const getDoctorsForPatient = asyncHandler(async (req, res) => {
  const patientId = req.params.patientId;
  if (!mongoose.isValidObjectId(patientId)) throw new ApiError(400, "Invalid patient ID");

  const patient = await Patient.findOne({ _id: patientId, createdBy: req.user.id });
  if (!patient) throw new ApiError(404, "Patient not found or not owned by you");

  const mappings = await Mapping.find({ patient: patientId }).populate("doctor");
  res.json(mappings.map(m => m.doctor));
});

export const removeMapping = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid mapping ID");

  // ensure mapping is for a patient owned by user
  const mapping = await Mapping.findById(id);
  if (!mapping) throw new ApiError(404, "Mapping not found");

  const owns = await Patient.exists({ _id: mapping.patient, createdBy: req.user.id });
  if (!owns) throw new ApiError(403, "Not allowed");

  await Mapping.findByIdAndDelete(id);
  res.json({ message: "Mapping removed" });
});
