import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/userInfoController.js";

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    // body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  registerUser
);

export default router;
