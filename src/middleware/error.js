import ApiError from "../utils/ApiError.js";

export default function errorHandler(err, _req, res, _next) {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
}
