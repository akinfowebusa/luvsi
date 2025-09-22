import User from "../models/asifUser.js";

// export const saveUserData = async (req, res) => {
//   try {
//     const {
//       city,
//       name,
//       dob,
//       gender,
//       height,
//       sign,
//       education,
//       lookingFor,
//       crush,
//       favPlace,
//     } = req.body;

//     const newUser = new User({
//       city: city || "",
//       name: name || "",
//       dob: dob || "",
//       gender: gender || "",
//       height: height || "",
//       sign: sign || "",
//       education: education || "",
//       lookingFor: lookingFor || "",
//       crush: crush || "",
//       favPlace: Array.isArray(favPlace) ? favPlace : [], // 👈 safe parse
//     });

//     await newUser.save();
//     res.status(201).json({ success: true, message: "User data saved!", data: newUser });
//   } catch (error) {
//     console.error("❌ Backend Error:", error.message);
//     res.status(500).json({ success: false, message: "Error saving user data", error: error.message });
//   }
// };



// backend/controllers/asifUserController.js


// export const saveUserData = async (req, res) => {
//   try {
//     const {
//       city,
//       name,
//       dob,
//       gender,
//       height,
//       sign,
//       education,
//       lookingFor,
//       crush,
//       favPlace,
//     } = req.body;

//     // ✅ multer file path
//     const imagePath = req.file ? req.file.path : "";

//     const newUser = new User({
//       fullName: name || "", // ✅ schema me fullName hai
//       dateOfBirth: dob || "", // ✅ schema me dateOfBirth hai
//       gender: gender || "",
//       height: height || "",
//       sign: sign || "",
//       education: education || "",

//       location: {
//         city: city || "", // ✅ schema me location.city hai
//       },

//       // ✅ agar tum "images" array use karna chahte ho
//       images: imagePath ? [{ url: imagePath, isProfilePic: true }] : [],

//       // ✅ extra fields agar schema me add kiye ho
//       lookingFor: lookingFor || "",
//       crush: crush || "",
//       favPlace: Array.isArray(favPlace)
//         ? favPlace
//         : favPlace
//         ? favPlace.split(",")
//         : [],
//     });

//     await newUser.save();

//     res.status(201).json({
//       success: true,
//       message: "✅ User data saved successfully!",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error("❌ Backend Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error saving user data",
//       error: error.message,
//     });
//   }
// };


export const saveUserData = async (req, res) => {
  try {
    const {
      city,
      name,
      dob,
      gender,
      height,
      sign,
      education,
      lookingFor,
      crush,
      favPlace,
    } = req.body || {};

    // Validate required fields
    if (!city || !name) {
      return res.status(400).json({
        success: false,
        message: "city and name are required",
      });
    }

    // Combine single and multiple uploaded files
    const uploadedFiles = [
      ...(req.files?.image || []),
      ...(req.files?.images || []),
    ];

    const images = uploadedFiles.map((file, index) => ({
      url: file.path.replace(/\\/g, "/"),
      isProfilePic: index === 0, // first uploaded image as profile pic
    }));

    // Prepare user object
    const newUser = new User({
      city,
      name,
      dob,
      gender,
      height,
      sign,
      education,
      lookingFor,
      crush,
      favPlace: favPlace
        ? Array.isArray(favPlace)
          ? favPlace
          : favPlace.split(",")
        : [],
      images,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User data saved successfully!",
      data: savedUser,
    });
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error saving user data",
      error: error.message,
    });
  }
};
