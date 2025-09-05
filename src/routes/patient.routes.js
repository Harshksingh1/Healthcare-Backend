import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import {
  createPatient,
  getMyPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = Router();
router.use(auth);

const patientValidators = [
  body("name").isString().notEmpty(),
  body("gender").isIn(["male", "female", "other"]),
  body("age").optional().isInt({ min: 0 }),
  body("address").optional().isString(),
  body("medicalHistory").optional().isArray(),
];

router.post("/", patientValidators, createPatient);
router.get("/", getMyPatients);
router.get("/:id", getPatient);
router.put("/:id", patientValidators, updatePatient);
router.delete("/:id", deletePatient);

export default router;
