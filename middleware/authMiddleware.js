// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your-jwt-secret'); // Use an environment variable for secret
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized', error });
//   }
// };




// new code

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, Unauthorized" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password"); // omit password
    if (!user) {
      return res.status(401).json({ message: "User not found, Unauthorized" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    res.status(401).json({ message: "Invalid token, Unauthorized" });
  }
};

// ✅ Role-based Authorization
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
