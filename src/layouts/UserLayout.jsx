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
import { Link } from "react-router-dom";

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
    localStorage.removeItem("token");

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
      <nav className="bg-white shadow-sm px-3 py-2 fixed top-0 left-0 right-0 z-10 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center space-x-2 font-dramatic-header-user">
            <Link to="/user/drama" className="flex items-center space-x-2">
              <FaDoorOpen className="text-green-600 text-2xl" />
              <span>Welcome To Cengkir Gading</span>
            </Link>
          </div>

          <div className="flex items-center mr-14">
            <Link to="/user/drama">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-48 h-auto"
                style={{ maxWidth: "none", maxHeight: "none" }}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 font-sidebar-menu">
            <Link to="/user/drama" className="text-green-600">
              20102036
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-green-700"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <sidebar className="bg-white shadow-xl border-r border-gray-500 h-full overflow-y-auto">
          <div className="p-4 flex flex-col items-center mt-6">
            <div className="mt-2 text-gray-700 font-bold text-lg font-sidebar-heading">
              Ardhana Galih
            </div>
            <a
              href="/user/drama"
              className="text-sm text-green-600 mt-1 font-sidebar-menu"
            >
              20102036
            </a>
          </div>
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <a
                  href="/user/drama"
                  className={`text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
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
                  className={`text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
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
                        className="text-gray-600 hover:text-green-700 font-sidebar-menu "
                      >
                        Artikel
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/daily-exercise/buku"
                        className="text-gray-600 hover:text-green-700 font-sidebar-menu"
                      >
                        Buku
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/daily-exercise/akting"
                        className="text-gray-600 hover:text-green-700 font-sidebar-menu"
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
                  className={`text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
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
                    className={`ml-2 transition-transform ${
                      isScenarioLibraryOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </a>
                {isScenarioLibraryOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    <li>
                      <a
                        href="/user/skenario/cerita-drama"
                        className="text-gray-600 hover:text-green-700 font-sidebar-menu"
                      >
                        Cerita Drama
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/skenario/cerita-pendek"
                        className="text-gray-600 hover:text-green-700 font-sidebar-menu"
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
                  className="text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaUserCheck className="mr-3 text-xl" />
                  <span>Evaluasi Karakter</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user/kalender-acara"
                  className="text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaCalendarAlt className="mr-3 text-xl" />
                  <span>Kalender Acara</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/user/kontak"
                  className="text-gray-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaPhone className="mr-3 text-xl" />
                  <span>Kontak & Dukungan</span>
                </a>
              </li>
            </ul>
          </nav>
        </sidebar>

        {/* Content */}
        <main className="flex-1 mt-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 shadow-md py-10 border-t border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <a href="/user/drama" onClick={scrollToTop}>
              <img
                src="/logo2.png"
                alt="Logo"
                className="w-36 mb-2 cursor-pointer"
              />
            </a>
            <p className="text-white text-sm text-center md:text-left font-dramatic-body-user">
              © 2024 Pasar Lelang Drama Cengkir Gading. All rights reserved.
            </p>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Our Menu
            </h3>
            <ul className="space-y-2 font-dramatic-body">
              <li>
                <a
                  href="/perpustakaan-drama"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Perpustakaan Drama
                </a>
              </li>
              <li>
                <a
                  href="/daily-exercise"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Daily Exercise
                </a>
              </li>
              <li>
                <a
                  href="/perpustakaan-skenario"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Perpustakaan Skenario
                </a>
              </li>
              <li>
                <a
                  href="/evaluasi-karakter"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Evaluasi Karakter
                </a>
              </li>
              <li>
                <a
                  href="/kalender-acara"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Kalender Acara
                </a>
              </li>
              <li>
                <a
                  href="/kontak-dukungan"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Kontak dan Dukungan
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Hours Section */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Jam Operasional
            </h3>
            <p className="text-white font-dramatic-body-user">Senin-Jumat</p>
            <p className="text-white font-dramatic-body-user">16:00 - 18:00</p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Kontak Kami
            </h3>
            <p className="text-white font-dramatic-body">Ardhana@gmail.com</p>
            <p className="text-white font-dramatic-body">PusatDramaITTP</p>
            <p className="text-white font-dramatic-body">083207010875</p>
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
