
import User from "../models/asifUser.js";

export const getUserData = async (req, res) => {
  try {
    const { email } = req.query; 
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
