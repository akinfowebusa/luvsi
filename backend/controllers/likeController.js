const Like = require('../models/Like');
const User = require('../models/User');
const Match = require('../models/Match');


exports.likeUser = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id; 

  try {
    
    const like = new Like({ userId, targetUserId });
    await like.save();

    
    const reverseLike = await Like.findOne({ userId: targetUserId, targetUserId: userId });
    
    if (reverseLike) {
      
      const match = new Match({ userId, matchedUserId: targetUserId });
      await match.save();

      return res.status(200).json({ message: 'Match found!', match: true });
    }

    res.status(200).json({ message: 'Like successful', match: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
