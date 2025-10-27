import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.config.js";
import fetchUserRoutes from "./routes/fetchUserRoutes.js";
import User from "./models/asifUser.js";        
import asifRoutes from "./routes/asifRoutes.js"; 
import { updateUserData } from "./controllers/asifUserController.js";
import userActionsRoute from "./routes/userActionsRoute.js"
import attachSocket from './config/socket.js'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const { httpServer, io} =attachSocket(app);


connectDB();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));


app.use("/api", asifRoutes,fetchUserRoutes,userActionsRoute , chatRoutes);


app.post(
  "/api/register",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { fullName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ success: false, message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ fullName, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { id: newUser._id, fullName, email },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/api/getuser", async (req, res) => {
  try {
    const { id, email } = req.query;
    let user;
    if (id) user = await User.findById(id);
    else if (email) user = await User.findOne({ email });
    else user = await User.find({});

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

const cookieSchema = new mongoose.Schema({
  name: String,
  value: String,
  createdAt: { type: Date, default: Date.now },
});
const CookieModel = mongoose.model("Cookie", cookieSchema);

app.post("/set-cookie", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username is required" });

    res.cookie("username", username, { maxAge: 1000 * 60 * 60, httpOnly: true });
    const newCookie = new CookieModel({ name: "username", value: username });
    await newCookie.save();

    res.json({ message: "Cookie set & saved in DB", cookie: username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) res.send(`Cookie Value: ${username}`);
  else res.send("No cookie found.");
});

app.get("/clear-cookie", async (req, res) => {
  try {
    const username = req.cookies.username;
    res.clearCookie("username");
    if (username) await CookieModel.deleteOne({ name: "username", value: username });
    res.send("Cookie cleared from Browser & DB!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => res.send("Server running!"));

// without socket connection. 
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

httpServer.listen(PORT,()=>{
  console.log(`Server is running at  ${PORT}`);
})