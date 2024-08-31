import React from "react";
import api from "../services/api";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaTasks,
  FaWpforms,
  FaTable,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const handleLogout = async () => {
    try {
      await api.post("/logout");

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-green-700 text-white flex flex-col fixed h-full z-20">
        <div className="flex items-center justify-center h-20 bg-gray-300">
          <img src="/logo1.png" alt="Cengkir Gading Logo" className="h-16" />
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          <a
            href="/admin/dashboard"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaTachometerAlt className="text-xl mt-2" />
            <span className="ml-3 mt-2">Dashboard</span>
          </a>
          <a
            href="/admin/drama"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaCalendarAlt className="text-xl mt-2" />
            <span className="ml-3 mt-2">Perpustakaan Drama</span>
          </a>
          <a
            href="/admin/exercise"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaUser className="text-xl mt-2" />
            <span className="ml-3 mt-2">Daily Exercise</span>
          </a>
          <a
            href="/admin/skenario"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaTasks className="text-xl mt-2" />
            <span className="ml-3 mt-2">Perpustakaan Skenario</span>
          </a>
          <a
            href="/admin/karakter"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaWpforms className="text-xl mt-2" />
            <span className="ml-3 mt-2">Evaluasi Karakter</span>
          </a>
          <a
            href="/admin/acara"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaTable className="text-xl mt-2" />
            <span className="ml-3 mt-2">Kalender Acara</span>
          </a>
          <a
            href="/admin/user"
            className="flex items-center px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded border-b border-white"
          >
            <FaUsers className="text-xl mt-2" />
            <span className="ml-3 mt-2">Users List</span>
          </a>
        </nav>
      </aside>

      {/* Navbar */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between h-20 px-6 bg-green-700 border-b border-gray-200 fixed w-full z-10 ml-60">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white hover:text-black">
              <FaHome className="text-3xl" />
            </a>
            <button
              onClick={handleLogout}
              className="text-white hover:text-black"
            >
              <FaSignOutAlt className="text-3xl" />
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 mr-60">
              <img
                src="/Admin.jpg"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-sm">
                <div className="font-medium text-white text-sm">
                  Ardhana Galih
                </div>
                <div className="text-white text-xs">Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-2 bg-gray-100 mt-20 ml-60 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
