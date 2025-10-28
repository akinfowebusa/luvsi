import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LuvsiLogo from "../assets/LuvsiLogo.png";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-transparent backdrop-blur-sm transition-transform duration-500 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={LuvsiLogo}
                alt="Luvsi Logo"
                className="h-10 w-10 object-contain drop-shadow-md"
              />
              <span className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
                Luvsi
              </span>
            </Link>
          </div>

         
          <div className="hidden md:flex items-left gap-6">
            {[
              { name: "Products", path: "/products" },
              { name: "Learn", path: "/learn" },
              { name: "Safety", path: "/safety" },
              { name: "Support", path: "/support" },
              { name: "Download", path: "/download" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-white hover:text-red-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-white hover:text-red-400 transition-colors">
              🌐 Language
            </button>
            <Link
              to="/adminlogin"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-white hover:text-red-400 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
