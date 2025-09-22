import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    city: { type: String, default: "" },
    name: { type: String, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    height: { type: String, default: "" },
    sign: { type: String, default: "" },
    education: { type: String, default: "" },
    lookingFor: { type: String, default: "" },
    crush: { type: String, default: "" },
    favPlace: { type: [String], default: [] },

    images: {
      type: [
        {
          url: { type: String },
          isProfilePic: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
