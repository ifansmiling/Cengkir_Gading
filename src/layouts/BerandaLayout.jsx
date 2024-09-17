import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

const BerandaLayout = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const handleScrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#2e9e46] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white py-2 px-2 shadow-sm sticky top-0 z-50 flex items-center">
        <div className="flex items-center">
          <a
            href="/"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D] font-dramatic-body`}
            onClick={() => handleClick("/")}
          >
            <FaHome className="mr-1" />
            Beranda
          </a>
        </div>
        <div className="flex-1 flex justify-center ml-40">
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
            } hover:text-[#0B771D] font-dramatic-body`}
            onClick={() => handleClick("/login")}
          >
            <FaSignInAlt className="mr-1" />
            Login
          </a>
          <a
            href="/signup"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/signup"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D] font-dramatic-body`}
            onClick={() => handleClick("/signup")}
          >
            <FaUserPlus className="mr-1" />
            Sign up
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer>
        <div className="bg-custom-gray py-4 px-4 text-white mt-auto shadow-md">
          <div className="container mx-auto flex justify-between items-start space-x-6">
            {/* Section Ajakan Bergabung */}
            <div className="w-1/3">
              <h2 className="text-xl font-footer-heading font-bold mb-4">
                Silahkan Daftar dan Bergabung dengan Kami!
              </h2>
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm font-footer-body">
                  Dapatkan berita terbaru, pelatihan, dan informasi acara
                  langsung dari kami!
                </p>
              </div>
              <div className="flex items-start py-4">
                <a
                  href="/signup"
                  onClick={handleScrollToTop}
                  className="text-sm py-2 rounded-lg font-bold text-white hover:text-green-700 flex items-center"
                >
                  <FaUser className="mr-2 text-sm" /> Gabung
                </a>
              </div>

              <p className="text-xs text-gray-400 font-footer-body">
                By signing up, you agree to our{" "}
                <a
                  href="/"
                  onClick={handleScrollToTop}
                  className="underline text-green-800"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Section Info Kontak */}
            <div className="w-1/3 flex justify-center items-center mt-4 mr-3">
              <img src="/logo.png" alt="Footer Logo" className="w-24 h-auto" />
              <div className="ml-4 text-left">
                <p className="font-footer-body text-sm">
                  Jl. DI Panjaitan No.128, Karangreja, Purwokerto Kidul
                </p>
                <p className="font-footer-body text-sm">
                  Kec. Purwokerto Sel., Kabupaten Banyumas
                </p>
                <p className="mt-2 text-gray-400 flex items-center font-footer-body">
                  <FaPhone className="mr-2 text-sm" />
                  (628) 7770-8333-47
                </p>
                <button className="bg-green-800 text-sm hover:bg-green-900 px-3 py-2 rounded-md mt-4 text-white flex items-center">
                  <FaPaperPlane className="mr-2 text-sm" /> Contact
                </button>
              </div>
            </div>

            {/* Section Media Sosial */}
            <div className="w-1/4 text-center mr-4">
              <h2 className="text-xl font-footer-heading mb-4">Follow Us</h2>
              <div className="flex justify-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black py-2">
          <div className="container mx-auto text-center text-gray-500 text-xs font-footer-body">
            <span className="mr-2">
              © 2024 Cengkir Gading. All rights reserved.
            </span>

            <a
              href="/"
              onClick={handleScrollToTop}
              className="underline hover:text-white"
            >
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a
              href="/"
              onClick={handleScrollToTop}
              className="underline hover:text-white"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BerandaLayout;
