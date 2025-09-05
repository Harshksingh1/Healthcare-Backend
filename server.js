import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import errorHandler from "./src/middleware/error.js";

import authRoutes from "./src/routes/auth.routes.js";
import patientRoutes from "./src/routes/patient.routes.js";
import doctorRoutes from "./src/routes/doctor.routes.js";
import mappingRoutes from "./src/routes/mapping.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ status: "ok", service: "healthcare-backend" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

// error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
