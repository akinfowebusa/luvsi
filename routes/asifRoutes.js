// // // backend/routes/userRoutes.js
// import express from "express";
// import { saveUserData } from "../controllers/asifUserController.js";
// import multer from "multer";

// const router = express.Router();

// // ✅ Route
// router.post("/asif-user", saveUserData);
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // unique filename
//   },
// });

// const upload = multer({ storage });

// // ✅ Route: Save user data + upload image
// router.post("/asif-user", upload.single("image"), saveUserData);

// export default router;

// // export default router;


// // // backend/routes/userRoutes.js
// // import express from "express";
// // import multer from "multer";
// // import path from "path";
// // import { saveUserData } from "../controllers/asifUserController.js";
// // import User from "../models/User.js";

// // const router = express.Router();

// // // ✅ Multer storage setup
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/"); // images will be stored inside /uploads
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     cb(null, uniqueSuffix + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({ storage });

// // // ✅ Route: Save user details
// // router.post("/asif-user", saveUserData);

// // // ✅ Route: Upload user photo
// // router.post("/upload-photo/:userId", upload.single("photo"), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded" });
// //     }

// //     const imagePath = `/uploads/${req.file.filename}`;

// //     // Push photo into user's photos array
// //     const user = await User.findByIdAndUpdate(
// //       req.params.userId,
// //       { $push: { photos: { url: imagePath } } },
// //       { new: true }
// //     );

// //     res.json({ success: true, photo: imagePath, user });
// //   } catch (error) {
// //     console.error("Upload error:", error);
// //     res.status(500).json({ message: "Error uploading photo" });
// //   }
// // });

// // export default router;


// // backend/routes/asifRoutes.js


// // ✅ Multer storage config (local uploads/)


import express from "express";
import multer from "multer";
import { saveUserData } from "../controllers/asifUserController.js";

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Support both single image (`image`) and multiple images (`images`)
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },    // single profile pic
  { name: "images", maxCount: 6 },   // multiple other pics
]);

// ✅ Route: handle form-data + images
router.post("/asif-user", uploadFields, saveUserData);

export default router;
