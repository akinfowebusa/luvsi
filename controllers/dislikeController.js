const Dislike = require('../models/Dislike');

// Dislike another user's profile
exports.dislikeUser = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id;

  try {
    // Create a new dislike
    const dislike = new Dislike({ userId, targetUserId });
    await dislike.save();

    res.status(200).json({ message: 'Dislike successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
