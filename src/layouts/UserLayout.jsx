import React, { useState, useEffect } from "react";
import {
  FaDoorOpen,
  FaChevronDown,
  FaBook,
  FaRunning,
  FaTheaterMasks,
  FaCalendarAlt,
  FaPhone,
  FaUserCheck,
  FaSignOutAlt,
  FaArrowUp, 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const [isDramaLibraryOpen, setIsDramaLibraryOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [isScenarioLibraryOpen, setIsScenarioLibraryOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  const toggleDramaLibrary = () => {
    setIsDramaLibraryOpen(!isDramaLibraryOpen);
    setActiveItem("drama");
  };

  const toggleExerciseLibrary = () => {
    setIsExerciseOpen(!isExerciseOpen);
    setActiveItem("exercise");
  };

  const toggleScenarioLibrary = () => {
    setIsScenarioLibraryOpen(!isScenarioLibraryOpen);
    setActiveItem("scenario");
  };

  const handleLogout = () => {
    // Implement logout logic here, such as clearing tokens or user data
    // Then redirect to the home page
    navigate("/");
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-sm px-3 py-2 fixed top-0 left-0 right-0 z-10 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center space-x-2">
            <FaDoorOpen className="text-green-600 text-2xl" />
            <span>Welcome To Cengkir Gading</span>
          </div>
          <div className="flex items-center mr-14">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-48 h-auto"
              style={{ maxWidth: "none", maxHeight: "none" }}
            />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-green-600">
              20102036
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-green-700"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="bg-white shadow-xl border-r border-gray-500 h-full overflow-y-auto">
          <div className="p-4 flex flex-col items-center mt-3">
            <div className="mt-2 text-gray-700 font-bold">Ardhana Galih</div>
            <a href="/user/drama" className="text-sm text-green-600 mt-1">
              20102036
            </a>
          </div>
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <a
                  href="/user/drama"
                  className={`text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeItem === "drama" || isDramaLibraryOpen
                      ? "text-green-700"
                      : "hover:text-green-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDramaLibrary();
                  }}
                >
                  <FaTheaterMasks className="mr-3 text-xl" />
                  <span>Perpustakaan Drama</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user/daily-exercise"
                  className={`text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeItem === "exercise" || isExerciseOpen
                      ? "text-green-700"
                      : "hover:text-green-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleExerciseLibrary();
                  }}
                >
                  <FaRunning className="mr-3 text-xl" />
                  <span>Daily Exercise</span>
                  <FaChevronDown
                    className={`ml-auto transition-transform ${
                      isExerciseOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </a>
                {isExerciseOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <a
                        href="/user/daily-exercise/artikel"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Artikel
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/daily-exercise/buku"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Buku
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/daily-exercise/akting"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Teori-teori Akting
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-2">
                <a
                  href="/user/skenario"
                  className={`text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeItem === "scenario" || isScenarioLibraryOpen
                      ? "text-green-700"
                      : "hover:text-green-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleScenarioLibrary();
                  }}
                >
                  <FaBook className="mr-3 text-xl" />
                  <span>Perpustakaan Skenario</span>
                  <FaChevronDown
                    className={`ml-auto transition-transform ${
                      isScenarioLibraryOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </a>
                {isScenarioLibraryOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <a
                        href="/user/skenario/cerita-drama"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Cerita Drama
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/skenario/cerita-pendek"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Cerita Pendek
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-2">
                <a
                  href="/user/evaluasi-karakter"
                  className="text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaUserCheck className="mr-3 text-xl" />
                  <span>Evaluasi Karakter</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user/kalender-acara"
                  className="text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaCalendarAlt className="mr-3 text-xl" />
                  <span>Kalender Acara</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user/kontak"
                  className="text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaPhone className="mr-3 text-xl" />
                  <span>Kontak & Dukungan</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 mt-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md py-6 border-t border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-green-700">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-green-700"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-green-700">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-600">
              © 2024 Cengkir Gading. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-7 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base" />
        </button>
      )}
    </div>
  );
};

export default UserLayout;
