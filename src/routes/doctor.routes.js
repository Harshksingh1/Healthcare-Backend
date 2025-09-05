import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";

const router = Router();

// public reads
router.get("/", getAllDoctors);
router.get("/:id", getDoctor);

// writes require auth
const doctorValidators = [
  body("name").isString().notEmpty(),
  body("specialty").isString().notEmpty(),
  body("email").optional().isEmail(),
  body("phone").optional().isString(),
];

router.post("/", auth, doctorValidators, createDoctor);
router.put("/:id", auth, doctorValidators, updateDoctor);
router.delete("/:id", auth, deleteDoctor);

export default router;
