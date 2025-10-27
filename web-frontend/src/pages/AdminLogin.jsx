import React from 'react';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

const AdminLogin = () => {
  return (
    
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        
        background: 'linear-gradient(135deg, #F900FF)',
      }}
    >
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-12 backdrop-blur-sm bg-opacity-95">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Login
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
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
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
              style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
            />
          </div>
        </div>


        <div className="text-right mb-8">
          <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition duration-200">
            Forgot password?
          </a>
        </div>

        <button
          className="w-full text-white font-semibold py-3 px-4 rounded-full shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
          style={{
            
            background: 'linear-gradient(to right, #D946EF)',
          }}
        >
          LOGIN
        </button>

        
        <div className="text-center text-gray-500 my-8 text-sm">
          Or Sign Up Using
        </div>

        <div className="flex justify-center space-x-4 mb-8">

          <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:opacity-80 transition">
            <FaFacebookF />
          </a>

          <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white shadow-md hover:opacity-80 transition">
            <FaTwitter />
          </a>
          
          <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white shadow-md hover:opacity-80 transition">
            <FaGoogle />
          </a>
        </div>
        
        
        <div className="text-center">
            <p className="text-gray-500 mb-2 text-sm">
                Or Sign Up Using
            </p>
            <a href="#" className="text-purple-600 font-semibold text-sm hover:underline">
                SIGN UP
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;