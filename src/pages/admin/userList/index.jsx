import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FaEdit, FaTrash, FaPlus, FaCaretDown } from "react-icons/fa";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const userList = response.data;
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    navigate("/admin/user/create");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await api.delete(`/user/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
        alert("Pengguna berhasil dihapus");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Gagal menghapus pengguna");
      }
    }
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole === "" ||
        user.role.toLowerCase() === selectedRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, users]);

  // Pagination logic
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // SimplePagination component
  const SimplePagination = () => {
    const next = () => {
      if (activePage < totalPages) setActivePage(activePage + 1);
    };

    const prev = () => {
      if (activePage > 1) setActivePage(activePage - 1);
    };

    return (
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          disabled={activePage === 1}
          className={`border border-green-300 rounded-full p-2 ${
            activePage === 1
              ? "text-green-300 cursor-not-allowed"
              : "text-gray-700 hover:text-green-700"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        <span className="text-gray-500">
          Page <strong className="text-green-700">{activePage}</strong> of{" "}
          <strong className="text-green-600">{totalPages}</strong>
        </span>

        <button
          onClick={next}
          disabled={activePage === totalPages}
          className={`border border-green-300 rounded-full p-2 ${
            activePage === totalPages
              ? "text-green-300 cursor-not-allowed"
              : "text-black hover:text-green-700"
          }`}
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Semua Pengguna
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center max-w-sm mx-auto mb-4"
        >
          <label htmlFor="user-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="user-search"
              className="bg-white border border-green-300 hover:border-green-700 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full pl-4 p-2.5 focus:outline-none"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-900 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <button
          onClick={handleClick}
          className="font-dramatic-header flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
        >
          <FaPlus className="mr-2" />
          <span>Tambah User</span>
        </button>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-center rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200 font-dramatic-header">
                <th className="py-2 px-4">No</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">NIM</th>
                <th className="py-2 px-4 relative">
                  Role
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="ml-2 text-gray-500 focus:outline-none"
                  >
                    <FaCaretDown />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10">
                      <button
                        onClick={() => handleRoleFilter("")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "" ? "bg-gray-100" : ""
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => handleRoleFilter("User")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "User" ? "bg-gray-100" : ""
                        }`}
                      >
                        User
                      </button>
                      <button
                        onClick={() => handleRoleFilter("Admin")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "Admin" ? "bg-gray-100" : ""
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  )}
                </th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 border font-dramatic-header">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-2 px-4 border font-dramatic-body-user">
                    {user.nama}
                  </td>
                  <td className="py-2 px-4 border font-dramatic-body-user">
                    {user.nim}
                  </td>
                  <td className="py-2 px-4 border font-dramatic-body-user">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => navigate(`/admin/user/edit/${user.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <SimplePagination />
      </div>
    </AdminLayout>
  );
};

export default UserList;
