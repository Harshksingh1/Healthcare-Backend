import { validationResult, param } from "express-validator";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import Patient from "../models/Patient.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPatient = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const data = { ...req.body, createdBy: req.user.id };
  const patient = await Patient.create(data);
  res.status(201).json(patient);
});

export const getMyPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
  res.json(patients);
});

export const getPatient = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const patient = await Patient.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!patient) throw new ApiError(404, "Patient not found");
  res.json(patient);
});

export const updatePatient = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const updated = await Patient.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) throw new ApiError(404, "Patient not found");
  res.json(updated);
});

export const deletePatient = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const deleted = await Patient.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
  if (!deleted) throw new ApiError(404, "Patient not found");
  res.json({ message: "Patient deleted" });
});
