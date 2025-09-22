// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/user";

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// // ✅ Register
// router.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, password, role } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ fullName, email, password: hashedPassword, role });

//     await newUser.save();

//     res.status(201).json({ message: "User registered ✅", userId: newUser._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Send JWT in cookie
//     res.cookie("token", token, { httpOnly: true, secure: false }); // use secure: true in production

//     res.json({ message: "Login successful ✅", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
//ye monogdb k liye tha ab sql k liye likhna hai
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import db from "../config/db.js";

// const router = express.Router();

// // ✅ Register
// router.post("/register", async (req, res) => {
//   const { fullName, email, password, role } = req.body;

//   try {
//     const existing = await db.get("SELECT * FROM users WHERE email = ?", [email]);
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await db.run(
//       "INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)",
//       [fullName, email, hashedPassword, role || "user"]
//     );

//     res.status(201).json({ message: "User registered ✅", userId: result.lastID });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.cookie("token", token, { httpOnly: true, secure: false });

//     res.json({ message: "Login successful ✅", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; // 🔹 import
import db from "../config/db.js";

const router = express.Router();

// ✅ Register
router.post(
  "/register",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: null,
        error: { code: 400, details: errors.array() },
        timestamp: new Date().toISOString(),
      });
    }

    const { fullName, email, password, role } = req.body;

    try {
      const existing = await db.get("SELECT * FROM users WHERE email = ?", [email]);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
          data: null,
          error: { code: 400, details: "Duplicate email" },
          timestamp: new Date().toISOString(),
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.run(
        "INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)",
        [fullName, email, hashedPassword, role || "user"]
      );

      res.status(201).json({
        success: true,
        message: "Registered",
        data: {
          id: result.lastID,
          fullName,
          email,
          role: role || "user",
        },
        error: null,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Registration failed",
        data: null,
        error: { code: 500, details: err.message },
        timestamp: new Date().toISOString(),
      });
    }
  }
);

// ✅ Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: null,
        error: { code: 400, details: errors.array() },
        timestamp: new Date().toISOString(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
          data: null,
          error: { code: 400, details: "No account exists with this email" },
          timestamp: new Date().toISOString(),
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
          data: null,
          error: { code: 400, details: "Password mismatch" },
          timestamp: new Date().toISOString(),
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, { httpOnly: true, secure: false });

      res.json({
        success: true,
        message: "Login successful",
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          token,
        },
        error: null,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Login failed",
        data: null,
        error: { code: 500, details: err.message },
        timestamp: new Date().toISOString(),
      });
    }
  }
);

export default router;
