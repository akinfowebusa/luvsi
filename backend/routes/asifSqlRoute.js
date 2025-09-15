import express from "express";
import multer from "multer";
import db from "../config/db.js";
import { saveUserData } from "../controllers/asifUserSqlController.js";
import { authenticate } from "../middleware/auth.js"; 

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);


router.post("/asif-user", authenticate, uploadFields, saveUserData);


router.get("/getuser", authenticate, async (req, res) => {
  try {
    const users = await db.all("SELECT * FROM users");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get("/getuser/:id", authenticate, async (req, res) => {
  try {
    const user = await db.get("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put("/updateuser/:id", authenticate, async (req, res) => {
  try {
    const { city, favPlace } = req.body;

    
    const favPlaceStr = Array.isArray(favPlace) ? favPlace.join(",") : favPlace;

    const result = await db.run(
      `UPDATE users SET city = ?, favPlace = ? WHERE id = ?`,
      [city, favPlaceStr, req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updatedUser = await db.get("SELECT * FROM users WHERE id = ?", [req.params.id]);

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
