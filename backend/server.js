// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// import { body, validationResult } from "express-validator";
// import cors from "cors";
// import connectDB from "./config/db.config.js"; // ✅ import DB config
// // import User from "../backend/models/user.js";
// // import userRoutes from "./routes/userRoute.js";

// import User from "../backend/models/asifUser.js";
// import asifRoutes from "./routes/asifRoutes.js";


// // Load environment variables
// dotenv.config();
// const app = express();
// app.use(express.json());
// connectDB();
// // app.use("/api", userRoutes);
// app.use("/api", asifRoutes);



// const DislikeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const MatchSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   matchedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // const User = mongoose.model("User", userSchema);

// // Register API
// // app.post(
// //   "/api/register",
// //   [
// //     body("fullName").notEmpty().withMessage("Full name is required"),
// //     body("email").isEmail().withMessage("Enter a valid email"),
// //     // body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);

// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({
// //         success: false,
// //         errors: errors.array(),
// //       });
// //     }

// //     try {
// //       const { fullName, email, password } = req.body;

// //       // check if email already exists
// //       const existingUser = await User.findOne({ email });
// //       if (existingUser) {
// //         return res.status(400).json({ success: false, message: "Email already registered" });
// //       }

// //       // create new user
// //       const newUser = new User({ fullName, email, password });
// //       await newUser.save();

// //       res.status(201).json({
// //         success: true,
// //         message: "User registered successfully",
// //         user: {
// //           id: newUser._id,
// //           fullName: newUser.fullName,
// //           email: newUser.email,
// //         },
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ success: false, message: "Server error" });
// //     }
// //   }
// // );

// // GET all users or single user by query
// app.get("/api/getuser", async (req, res) => {
//   try {
//     const { id, email } = req.query; // optional query params

//     let user;

//     if (id) {
//       // Get user by MongoDB ID
//       user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
//     } else if (email) {
//       // Get user by email
//       user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
//     } else {
//       // Get all users
//       user = await User.find({});
//     }

//     res.status(200).json({ success: true, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // GET user by ID
// app.get("/api/getuser/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: err.message,
//     });
//   }
// });

// // UPDATE user by ID
// app.put("/api/updateuser/:id", async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body; // fields to update

//   try {
//     // Find user by ID and update
//     const updatedUser = await User.findByIdAndUpdate(id, updateData, {
//       new: true, // return the updated document
//       runValidators: true, // validate before update
//     });

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: err.message,
//     });
//   }
// });



// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Cookie Schema
// const cookieSchema = new mongoose.Schema({
//   name: String,
//   value: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const CookieModel = mongoose.model("Cookie", cookieSchema);

// // ✅ Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 Server started on port " + PORT);
// });

// // ✅ POST: Set a cookie & Save in DB
// app.post("/set-cookie", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ error: "⚠️ Username is required!" });
//     }

//     // Set cookie in response
//     res.cookie("username", username, {
//       maxAge: 1000 * 60 * 60, // 1 hour
//       httpOnly: true,         // Secure from client-side JS
//     });

//     // Save cookie in DB
//     const newCookie = new CookieModel({
//       name: "username",
//       value: username,
//     });

//     await newCookie.save();

//     res.json({
//       message: "✅ Cookie set & saved in DB",
//       cookie: username,
//     });

//     console.log("📌 Cookie saved:", username);
//   } catch (err) {
//     console.error("❌ Error saving cookie:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ GET: Read cookie from browser/Postman
// app.get("/get-cookie", (req, res) => {
//   const username = req.cookies.username;
//   if (username) {
//     res.send(`🍪 Cookie Value: ${username}`);
//   } else {
//     res.send("❌ No cookie found.");
//   }
// });

// // ✅ GET: Clear cookie (Browser + DB)
// app.get("/clear-cookie", async (req, res) => {
//   try {
//     const username = req.cookies.username;

//     // Clear cookie from browser
//     res.clearCookie("username");

//     // Delete only that specific cookie from DB
//     if (username) {
//       await CookieModel.deleteOne({ name: "username", value: username });
//     }

//     res.send("🗑️ Cookie cleared from Browser & DB!");
//     console.log("🗑️ Cookie cleared:", username);
//   } catch (err) {
//     console.error("❌ Error clearing cookie:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Start Server
// app.listen(3000, () => {
//   console.log(`🚀 Server running at http://localhost:3000`);
// });





// // ✅ Routes


//ye sql ke liye server.js hai
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ SQLite DB
import db from "./config/db.js";

// ✅ Routes
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/asifSqlRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server running on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
