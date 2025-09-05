import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already registered");

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });

  const token = signToken(user);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new ApiError(401, "Invalid credentials");

  const token = signToken(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};
