import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").isString().isLength({ min: 2 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isString().withMessage("Password required"),
  ],
  login
);

export default router;
