import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export default function auth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(new ApiError(401, "Missing auth token"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}
