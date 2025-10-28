import React from "react";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import Header from "../component/Header";
import LoginButton from "../component/Button/LoginButton";

const AdminLogin = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-[#ff8a4f] to-[#8f4fbc]">
      
      <header className="absolute top-0 left-0 w-full z-20 bg-black">
        <Header />
      </header>


      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
           Luvsi Login
          </h2>


          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Type your username"
                className="w-full pl-12 pr-4 py-3 border-b border-gray-300 focus:border-purple-500 outline-none transition duration-300"
              />
            </div>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Type your password"
                className="w-full pl-12 pr-4 py-3 border-b border-gray-300 focus:border-purple-500 outline-none transition duration-300"
              />
            </div>
          </div>

          
          <div className="text-right mb-8">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-purple-600 transition duration-200"
            >
              Forgot password?
            </a>
          </div>

<div>
  <LoginButton/>
</div>

          
          <div className="text-center text-gray-500 my-8 text-sm">
            Or Sign Up Using
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:opacity-80 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white shadow-md hover:opacity-80 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white shadow-md hover:opacity-80 transition"
            >
              <FaGoogle />
            </a>
          </div>


          <div className="text-center">
            <p className="text-gray-500 mb-2 text-sm">Or Sign Up Using</p>
            <a
              href="#"
              className="text-purple-600 font-semibold text-sm hover:underline"
            >
              SIGN UP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
