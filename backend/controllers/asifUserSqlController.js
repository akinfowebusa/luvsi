import db from "../config/db.js"; // ✅ apna SQLite db.js import karo

export const saveUserData = async (req, res) => {
  try {
    const {
      city,
      fullName,
      dob,
      gender,
      height,
      sign,
      education,
      lookingFor,
      crush,
      favPlace,
    } = req.body || {};

    if (!city || !fullName) {
      return res.status(400).json({
        success: false,
        message: "city and fullName are required",
      });
    }

    // ✅ Files handling
    const uploadedFiles = [
      ...(req.files?.image || []),
      ...(req.files?.images || []),
    ];

    const images = uploadedFiles.map((file, index) => ({
      url: file.path.replace(/\\/g, "/"),
      isProfilePic: index === 0,
    }));

    // ✅ Convert arrays to storable strings
    const favPlaceStr = Array.isArray(favPlace)
      ? favPlace.join(",")
      : favPlace || "";

    const imagesStr = JSON.stringify(images);

    // ✅ Insert into SQLite
    const result = await db.run(
      `INSERT INTO users 
        (city, fullName, dob, gender, height, sign, education, lookingFor, crush, favPlace, images) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        city,
        fullName,
        dob,
        gender,
        height,
        sign,
        education,
        lookingFor,
        crush,
        favPlaceStr,
        imagesStr,
      ]
    );

    res.status(201).json({
      success: true,
      message: "User data saved successfully!",
      data: {
        id: result.lastID,
        city,
        fullName,
        dob,
        gender,
        height,
        sign,
        education,
        lookingFor,
        crush,
        favPlace: favPlaceStr.split(","),
        images,
      },
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


