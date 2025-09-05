import mongoose from "mongoose";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import Doctor from "../models/Doctor.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createDoctor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const doctor = await Doctor.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(doctor);
});

export const getAllDoctors = asyncHandler(async (_req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json(doctors);
});

export const getDoctor = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) throw new ApiError(404, "Doctor not found");
  res.json(doctor);
});

export const updateDoctor = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const updated = await Doctor.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) throw new ApiError(404, "Doctor not found or not owned by you");
  res.json(updated);
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, "Invalid ID");
  const deleted = await Doctor.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
  if (!deleted) throw new ApiError(404, "Doctor not found or not owned by you");
  res.json({ message: "Doctor deleted" });
});
