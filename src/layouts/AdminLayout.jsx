import React from "react";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUser,
  FaTasks,
  FaWpforms,
  FaTable,
  FaFile,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 bg-gray-200">
          <img src="/logo1.png" alt="Cengkir Gading Logo" className="h-16" />
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaTachometerAlt className="text-xl" />
            <span className="ml-3">Dashboard</span>
          </a>
          <a
            href="/"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaCalendarAlt className="text-xl" />
            <span className="ml-3">Calendar</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaUser className="text-xl" />
            <span className="ml-3">Profile</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaTasks className="text-xl" />
            <span className="ml-3">Task</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaWpforms className="text-xl" />
            <span className="ml-3">Forms</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaTable className="text-xl" />
            <span className="ml-3">Tables</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
          >
            <FaFile className="text-xl" />
            <span className="ml-3">Pages</span>
          </a>
        </nav>
      </aside>

      {/* Navbar */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between h-16 px-6 bg-green-700 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white hover:text-black">
              <FaHome className="text-3xl" />
            </a>
            <a href="/login" className="text-white hover:text-black">
              <FaSignOutAlt className="text-3xl" />
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img
                src="/Admin.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-sm">
                <div className="font-medium text-white">Ardhana Galih</div>
                <div className="text-white">Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content placeholder */}
        <div className="flex-1 p-6 bg-gray-100">{/* Content goes here */}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
