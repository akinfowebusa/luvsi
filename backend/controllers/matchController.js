const Match = require('../models/Match');


exports.getMatches = async (req, res) => {
  const userId = req.user.id;

  try {
    const matches = await Match.find({
      $or: [{ userId }, { matchedUserId: userId }],
    }).populate('userId matchedUserId', 'name profilePicture');

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
