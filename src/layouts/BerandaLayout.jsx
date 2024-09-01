import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Importing icons

const BerandaLayout = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="bg-[#C9D7B8] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#DAF0BE] py-2 px-2 shadow-md sticky top-0 z-50 flex items-center">
        <div className="flex items-center">
          <a
            href="/"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D] font-dramatic-body`} // Applying custom font
            onClick={() => handleClick("/")}
          >
            <FaHome className="mr-1" /> {/* Adding Home Icon */}
            Beranda
          </a>
        </div>
        <div className="flex-1 flex justify-center ml-32">
          <a href="/">
            <img src="/logo1.png" alt="Company Logo" className="w-44 h-auto" />
          </a>
        </div>
        <div className="flex items-center">
          <a
            href="/login"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/login"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D] font-dramatic-body`} // Applying custom font
            onClick={() => handleClick("/login")}
          >
            <FaSignInAlt className="mr-1" /> {/* Adding Login Icon */}
            Login
          </a>
          <a
            href="/signup"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/signup"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D] font-dramatic-body`} // Applying custom font
            onClick={() => handleClick("/signup")}
          >
            <FaUserPlus className="mr-1" /> {/* Adding SignUp Icon */}
            Sign up
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#DAF0BE] py-4 text-center mt-auto shadow-md">
        <p className="text-gray-800 font-merriweather">
          © 2024 Cengkir Gading. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BerandaLayout;
