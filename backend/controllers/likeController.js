const Like = require('../models/Like');
const User = require('../models/User');
const Match = require('../models/Match');

// Like another user's profile
exports.likeUser = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id; // Assuming you're using JWT for authentication

  try {
    // Create a new like
    const like = new Like({ userId, targetUserId });
    await like.save();

    // Check if the target user has already liked the current user
    const reverseLike = await Like.findOne({ userId: targetUserId, targetUserId: userId });
    
    if (reverseLike) {
      // If both users liked each other, create a match
      const match = new Match({ userId, matchedUserId: targetUserId });
      await match.save();

      return res.status(200).json({ message: 'Match found!', match: true });
    }

    res.status(200).json({ message: 'Like successful', match: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
