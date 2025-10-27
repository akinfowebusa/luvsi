import Like from "../models/Like.js";
import Dislike from "../models/Dislike.js";


export const likeUser = async (req, res) => {
  const { userId } = req.body;
  const fromUser = req.user;

  if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

  try {
    const like = await Like.create({ from: fromUser._id, to: userId });
    res.json({ success: true, message: "User liked successfully", like });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const dislikeUser = async (req, res) => {
  const { userId } = req.body;
  const fromUser = req.user;

  if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

  try {
    const dislike = await Dislike.create({ from: fromUser._id, to: userId });
    res.json({ success: true, message: "User disliked successfully", dislike });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
