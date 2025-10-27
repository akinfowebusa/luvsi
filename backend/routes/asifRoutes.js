import express from "express";
import multer from "multer";
import { saveUserData, updateUserData } from "../controllers/asifUserController.js";


const router = express.Router();


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });


// const uploadFields = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "images", maxCount: 6 },
// ]);

// router.post("/asif-user", uploadFields, saveUserData);
// router.put("/update-user", uploadFields, updateUserData);


// router.get("/asif-user", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.query.email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// });



const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);

router.post("/asif-user", uploadFields, saveUserData);
router.put("/update-user", uploadFields, updateUserData); 



export default router;
