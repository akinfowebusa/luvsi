import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { IoHomeOutline, IoGridOutline, IoMapOutline, IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

import bg1 from '../assets/auth1.jpg';
import bg2 from '../assets/auth2.jpg';
import bg3 from '../assets/auth3.jpg';
import LuvsiLogo from '../assets/LuvsiLogo.png';

const Homepage = () => {
  const images = [bg1, bg2, bg3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const threshold = 120;
      if (windowHeight - e.clientY < threshold) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-black transition-all duration-700"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      
      <header className="relative flex flex-col items-center justify-center flex-grow px-6 py-16 md:px-16 md:py-20 w-full bg-black bg-opacity-30">

        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        
          <div className="flex items-center gap-2">
            <img
              src={LuvsiLogo}
              alt="Luvsi Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-3xl font-bold text-white">Luvsi</span>
          </div>

        
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition font-medium bg-white bg-opacity-70"
          >
            <FcGoogle className="text-lg" /> Login with Google
          </Link>
        </div>

     
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-snug md:leading-tight max-w-md sm:max-w-lg md:max-w-xl my-8 text-white drop-shadow-lg">
          Cross paths, <br /> Date local.
        </h1>

        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
          <a href="#" className="inline-flex items-center justify-center bg-gray-100 text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition">
            <FaApple className="mr-2 text-lg" /> App Store
          </a>
          <a href="#" className="inline-flex items-center justify-center bg-gray-100 text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition">
            <FaGooglePlay className="mr-2 text-lg" /> Google Play
          </a>
        </div>

        <div className="absolute top-12 right-12 w-36 h-36 bg-[#d2b48c] bg-opacity-40 rounded-full rotate-12 opacity-70 hidden md:block"></div>
      </header>

     
      <nav
        className={`fixed bottom-5 left-20 right-20 flex justify-around items-center border border-gray-300 bg-white py-3 shadow-lg rounded-2xl transition-all duration-500 ${
          showNav ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <Link to="/user-profile">
          <IoHomeOutline size={22} className="text-[#964B00] hover:scale-110 transition-transform" />
        </Link>
        <Link to="/hub">
          <IoGridOutline size={22} className="text-black hover:scale-110 transition-transform" />
        </Link>
        <Link to="/map">
          <IoMapOutline size={22} className="text-[#4cef0cff] hover:scale-110 transition-transform" />
        </Link>
        <Link to="/likes">
          <IoHeartOutline size={22} className="text-[#de0d0dff] hover:scale-110 transition-transform" />
        </Link>
        <Link to="/chat">
          <IoChatbubbleOutline size={22} className="text-[#3139cfff] hover:scale-110 transition-transform" />
        </Link>
      </nav>
    </div>
  );
};

export default Homepage;
