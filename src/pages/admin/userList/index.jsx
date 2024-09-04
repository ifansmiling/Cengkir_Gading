import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../../../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const userList = response.data.filter((user) => user.role === "user");
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter((user) =>
        user.nama.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ target: { value: searchTerm } });
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
          onSubmit={handleSubmit}
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
        <button className="flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3">
          <FaPlus className="mr-2" />
          <span>Tambah User</span>
        </button>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">No</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">NIM</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.nama}</td>
                  <td className="py-2 px-4">{user.nim}</td>
                  <td className="py-2 px-4 flex justify-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserList;
