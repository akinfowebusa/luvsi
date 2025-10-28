import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoGridOutline,
  IoMapOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import Header from "../component/Header";
import AppStoreButton from "../component/Button/AppStoreButton";
import GooglePlayButton from "../component/Button/GooglePlayButton";

import bg1 from "../assets/auth1.jpg";
import bg2 from "../assets/auth2.jpg";
import bg3 from "../assets/auth3.jpg";
import bg4 from "../assets/home-bg.png";

const Homepage = () => {
  const images = [bg1, bg2, bg3, bg4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const threshold = 120;
      setShowNav(windowHeight - e.clientY < threshold);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-black transition-all duration-700 relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center center", 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >

      <Header />


      <header className="flex flex-col items-center justify-center flex-grow px-6 py-32 md:px-16 md:py-40 w-full bg-black/40 text-center mt-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug md:leading-tight drop-shadow-lg">
          Cross paths, <br /> Date local.
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10">
          <AppStoreButton />
          <GooglePlayButton />
        </div>
      </header>
      
      <nav
        className={`fixed bottom-10 left-20 right-20 flex justify-around items-center border border-gray-300 bg-white py-3 shadow-lg rounded-2xl transition-all duration-500 ${
          showNav ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <Link to="/user-profile">
          <IoHomeOutline
            size={22}
            className="text-[#964B00] hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/hub">
          <IoGridOutline
            size={22}
            className="text-black hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/map">
          <IoMapOutline
            size={22}
            className="text-[#4cef0cff] hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/likes">
          <IoHeartOutline
            size={22}
            className="text-[#de0d0dff] hover:scale-110 transition-transform"
          />
        </Link>
        <Link to="/chat">
          <IoChatbubbleOutline
            size={22}
            className="text-[#3139cfff] hover:scale-110 transition-transform"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Homepage;
