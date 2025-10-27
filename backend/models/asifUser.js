import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    city: { type: String, default: "" },
    fullName: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    height: { type: String, default: "" },
    sign: { type: String, default: "" },
    education: { type: String, default: "" },
    lookingFor: { type: String, default: "" },
    crush: { type: String, default: "" },
    favPlace: { type: [String], default: [] },
    smoke: { type: String, default: "" },
    kids: { type: String, default: "" },
    exercise: { type: String, default: "" },
    images: {
      type: [
        { url: String, isProfilePic: { type: Boolean, default: false } }
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
