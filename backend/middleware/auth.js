import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authenticate = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.get("SELECT * FROM users WHERE id = ?", [decoded.id]);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (roles = []) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
  next();
};
