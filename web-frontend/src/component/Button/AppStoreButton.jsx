import React from "react";
import { FaApple } from "react-icons/fa";

const AppStoreButton = ({ href = "#" }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center bg-gray-100 text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
    >
      <FaApple className="mr-2 text-lg" /> App Store
    </a>
  );
};

export default AppStoreButton;
