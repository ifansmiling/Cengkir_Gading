import React, { useState } from "react";
import api from "../services/api";
import { NavLink } from "react-router-dom";
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
  const nama = localStorage.getItem("nama");
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("nim");
      localStorage.removeItem("nama");
      localStorage.removeItem("role");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <sidebar className="w-60 bg-green-700 text-white flex flex-col fixed h-full z-20">
        <div className="flex items-center justify-center h-20 bg-gray-300">
          <img src="/logo1.png" alt="Cengkir Gading Logo" className="h-16" />
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {[
            {
              href: "/admin/dashboard",
              icon: FaTachometerAlt,
              label: "Dashboard",
            },
            {
              href: "/admin/drama",
              icon: FaTable,
              label: "Perpustakaan Drama",
            },
            { href: "/admin/exercise", icon: FaUser, label: "Daily Exercise" },
            {
              href: "/admin/skenario",
              icon: FaTasks,
              label: "Perpustakaan Skenario",
            },
            {
              href: "/admin/karakter",
              icon: FaWpforms,
              label: "Evaluasi Karakter",
            },
            {
              href: "/admin/kalender",
              icon: FaCalendarAlt,
              label: "Kalender Acara",
            },
            { href: "/admin/user", icon: FaUsers, label: "Users List" },
          ].map((menuItem) => (
            <NavLink
              key={menuItem.href}
              to={menuItem.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded border-b font-sidebar-menu-admin text-base border-white ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <menuItem.icon className="text-xl mt-2" />
              <span className="ml-3 mt-2">{menuItem.label}</span>
            </NavLink>
          ))}
        </nav>
      </sidebar>

      {/* Navbar */}
      <div className="flex flex-col flex-1">
        <nav className="flex items-center justify-between h-20 px-6 bg-green-700 border-b border-gray-200 fixed w-full z-10 ml-60">
          <div className="flex items-center space-x-6">
            <NavLink to="/" className="text-white hover:text-black">
              <FaHome className="text-3xl" />
            </NavLink>
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
                <div className="font-medium text-white text-sm font-sidebar-submenu">
                  {nama || "Unknown User"}
                </div>
                <div className="text-gray-900 text-xs font-sidebar-menu">
                  {role || "User"}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 p-2 bg-gray-100 mt-20 ml-60 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
