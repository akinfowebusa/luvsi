import User from "../models/asifUser.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";


export const saveUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    let decoded;
    try { decoded = jwt.verify(token, JWT_SECRET); } 
    catch { return res.status(401).json({ success: false, message: "Invalid token" }); }

    const userId = decoded.id;
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const uploadedFiles = [...(req.files?.image || []), ...(req.files?.images || [])];
    if (uploadedFiles.length > 0) {
      const images = uploadedFiles.map((file, index) => ({
        url: file.path.replace(/\\/g, "/"),
        isProfilePic: index === 0,
      }));
      user.images = [...user.images, ...images];
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        user[key] = req.body[key];
      }
    });

    await user.save();
    return res.json({ success: true, message: "User profile created successfully", data: user });
  } catch (err) {
    console.error("Backend Error:", err);
    return res.status(500).json({ success: false, message: "Error creating user", error: err.message });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    let decoded;
    try { decoded = jwt.verify(token, JWT_SECRET); } 
    catch { return res.status(401).json({ success: false, message: "Invalid token" }); }

    const userId = decoded.id;
    console.log("Decoded token:", decoded);
    console.log("userId from token:", userId);

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const fields = [
      "city","fullName","name","dob","gender","height","sign",
      "education","lookingFor","crush","favPlace","smoke","kids","exercise"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== null) {
        let value = req.body[field];
        if (typeof value === "string") { 
          try { value = JSON.parse(value); } catch {} 
        }

        if (field === "name") user.fullName = value;
        else if (field === "favPlace") user.favPlace = Array.isArray(value) ? value : [value];
        else user[field] = value;
      }
    });

    const uploadedFiles = [...(req.files?.image || []), ...(req.files?.images || [])];
    if (uploadedFiles.length > 0) {
      const images = uploadedFiles.map((file, index) => ({
        url: file.path.replace(/\\/g, "/"),
        isProfilePic: index === 0,
      }));
      user.images = [...user.images, ...images];
    }

    await user.save();
    return res.json({ success: true, message: "User profile updated successfully", data: user });
  } catch (err) {
    console.error("Backend Error:", err);
    return res.status(500).json({ success: false, message: "Error updating user data", error: err.message });
  }
};
