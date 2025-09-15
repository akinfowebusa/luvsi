const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await User.findById(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
