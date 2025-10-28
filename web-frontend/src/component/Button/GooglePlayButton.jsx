import React from "react";
import { FaGooglePlay } from "react-icons/fa";

const GooglePlayButton = ({ href = "#" }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-700 transition"
    >
      <FaGooglePlay className="mr-2 text-lg" /> Google Play
    </a>
  );
};

export default GooglePlayButton;
