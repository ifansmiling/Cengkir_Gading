import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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
            className={`mx-4 font-bold transition-colors duration-300 ${
              activeLink === "/"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/")}
          >
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
            className={`mx-4 font-bold transition-colors duration-300 ${
              activeLink === "/login"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/login")}
          >
            Login
          </a>
          <a
            href="/signup"
            className={`mx-4 font-bold transition-colors duration-300 ${
              activeLink === "/signup"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/signup")}
          >
            Sign up
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#DAF0BE] py-4 text-center mt-auto shadow-md">
        <p className="text-gray-800">
          © 2024 Cengkir Gading. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BerandaLayout;
