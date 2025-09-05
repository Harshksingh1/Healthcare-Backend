import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import {
  assignDoctor,
  getMappings,
  getDoctorsForPatient,
  removeMapping,
} from "../controllers/mapping.controller.js";

const router = Router();
router.use(auth);

router.post(
  "/",
  [
    body("patientId").isString().notEmpty(),
    body("doctorId").isString().notEmpty(),
  ],
  assignDoctor
);

router.get("/", getMappings);
router.get("/:patientId", getDoctorsForPatient);
router.delete("/:id", removeMapping);

export default router;
