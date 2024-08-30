import React, { useState } from "react";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const [isDramaLibraryOpen, setIsDramaLibraryOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [isScenarioLibraryOpen, setIsScenarioLibraryOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-sm px-3 py-2 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center space-x-2">
            <FaDoorOpen className="text-green-600 text-2xl" />
            <span>Welcome To Cengkir Gading</span>
          </div>
          <div className="flex items-center mr-12">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-48 h-auto ml-4"
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
      <div className="flex-1 pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-xl">
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
                        href="user/daily-exercise/artikel"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Artikel
                      </a>
                    </li>
                    <li>
                      <a
                        href="user/daily-exercise/buku"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Buku
                      </a>
                    </li>
                    <li>
                      <a
                        href="user/daily-exercise/akting"
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
                  href="user/skenario"
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
                        href="user/skenario/cerita-drama"
                        className="text-gray-600 hover:text-green-700"
                      >
                        Cerita Drama
                      </a>
                    </li>
                    <li>
                      <a
                        href="user/skenario/cerita-pendek"
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
                  href="user/evaluasi-karakter"
                  className="text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaUserCheck className="mr-3 text-xl" />
                  <span>Evaluasi Karakter</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="user/kalender-acara"
                  className="text-gray-700 font-medium flex items-center px-2 py-2 rounded transition duration-300 hover:text-green-700"
                >
                  <FaCalendarAlt className="mr-3 text-xl" />
                  <span>Kalender Acara</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="user/kontak"
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
        <main className="flex-1 p-2 mt-5">{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
