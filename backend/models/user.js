// const mongoose = require('mongoose');
// // User Schema
//   const userSchema = new mongoose.Schema(
//     {
//       fullName: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       email: {
//         type: String,
//         required: false,
//         unique: false,
//         lowercase: true,
//       },
//       phone: {
//         type: String,
//       },
  
//       // Profile info
//       gender: {
//         type: String,
//         enum: ["male", "female", "other"],
//         required: false,
//       },
//       dateOfBirth: {
//         type: Date,
//         required: false,
//       },
//       sign: {
//         type: String,
//         maxlength: 500,
//       },

//       height: {
//         type: String,
//         maxlength: 500,
//       },
//       education: {
//         type: String,
//         maxlength: 500,
//       },
//       location: {
//         city: String,
//         country: String,
//         coordinates: {
//           lat: Number,
//           lng: Number,
//         }
//       },
//       images:{
//          type: String,
//          imgURL:[]
//       },
  
//       // Preferences for matching
//       // interests: [String], // like ["travel", "music", "fitness"]
//       // lookingFor: {
//       //   type: String,
//       //   enum: ["friendship", "relationship", "casual", "marriage"],
//       // },
//       // preferredGender: {
//       //   type: String,
//       //   enum: ["male", "female", "other", "any"],
//       //   default: "any",
//       // },
//       // ageRange: {
//       //   min: { type: Number, default: 18 },
//       //   max: { type: Number, default: 40 },
//       // },
  
//       // Social logins
//       googleId: String,
//       facebookId: String,
//       appleId: String,
  
//       // Account settings
//       isVerified: { type: Boolean, default: false },
//       isPremium: { type: Boolean, default: false },
//     },
//     { timestamps: true }
//   );
  

// module.exports = mongoose.model('User', userSchema);

//new code


// const mongoose = require("mongoose");

// // User Schema
// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true, // ✅ required
//       unique: true,   // ✅ avoid duplicates
//       lowercase: true,
//     },
//     phone: {
//       type: String,
//       unique: true,   // ✅ avoid duplicate phone numbers
//     },

//     // 🔑 Authentication
//     password: {
//       type: String,
//       required: true, // only for email-password signup
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

//     // Profile info
//     gender: {
//       type: String,
//       enum: ["male", "female", "other"],
//     },
//     dateOfBirth: Date,
//     sign: { type: String, maxlength: 500 },
//     height: { type: String, maxlength: 500 },
//     education: { type: String, maxlength: 500 },
//     location: {
//       city: String,
//       country: String,
//       coordinates: {
//         lat: Number,
//         lng: Number,
//       },
//     },
//     images: [
//       {
//         url: String,
//         isProfilePic: { type: Boolean, default: false },
//       },
//     ],

//     // Social logins
//     googleId: String,
//     facebookId: String,
//     appleId: String,

//     // Account settings
//     isVerified: { type: Boolean, default: false },
//     isPremium: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// // ✅ FIX: prevent OverwriteModelError
// module.exports = mongoose.models.User || mongoose.model("User", userSchema);
