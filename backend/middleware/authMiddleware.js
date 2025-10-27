const jwt = require("jsonwebtoken");
const User = require("../models/asifUser.js");

const authenticate = async (req, res, next) => {
  try {

    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, Unauthorized" });

    }
    console.log("Token recieved", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) {
      return res.status(401).json({ message: "User not found, Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    res.status(401).json({ message: "Invalid token, Unauthorized" });
    
  }
  
};


const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
