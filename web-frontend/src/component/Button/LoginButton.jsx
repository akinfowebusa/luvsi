import React from "react";

const LoginButton = ({ text = "LOGIN", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-white font-semibold py-3 px-4 rounded-full shadow-lg 
                 transition duration-300 ease-in-out hover:shadow-xl 
                 bg-gradient-to-r from-[#ff8a4f] to-[#8f4fbc] hover:opacity-90"
    >
      {text}
    </button>
  );
};

export default LoginButton;
