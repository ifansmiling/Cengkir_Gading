import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../services/api";

import "./ModalTransisition.css";

const Drama = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
        const usersWithRoleUser = response.data.filter(
          (user) => user.role === "user"
        );
        setFilteredUsers(usersWithRoleUser);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    const fetchUserRatings = async () => {
      try {
        const response = await api.get("/user-rating", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserRatings(response.data);
      } catch (error) {
        console.error("Gagal mengambil rating pengguna:", error);
      }
    };

    fetchUsers();
    fetchUserRatings();
  }, []);

  const handleRowClick = (rating) => {
    setSelectedRating(rating);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Perpustakaan Drama
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-center">No</th>
                <th className="py-2 px-4 border-b text-center">Nama</th>
                <th className="py-2 px-4 border-b text-center">NIM</th>
                <th className="py-2 px-4 border-b text-center">
                  Rating Anggota
                </th>
                <th className="py-2 px-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {userRatings.map((rating, index) => (
                <tr
                  key={rating.id}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(rating)}
                >
                  <td className="py-2 px-4 border-b border">{index + 1}</td>
                  <td className="py-2 px-4 border-b border">
                    {rating.user.nama}
                  </td>
                  <td className="py-2 px-2 border-b border">
                    {rating.user.nim}
                  </td>
                  <td className="py-2 px-4 border-b border">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-500 text-xl hover:text-green-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Daftar Anggota
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-center">No</th>
                <th className="py-2 px-4 border-b text-center">Nama</th>
                <th className="py-2 px-4 border-b text-center">NIM</th>
                <th className="py-2 px-4 border-b text-center">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border">{index + 1}</td>
                  <td className="py-2 px-4 border-b border">{user.nama}</td>
                  <td className="py-2 px-4 border-b border">{user.nim}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center items-center h-full">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500 text-xl hover:text-green-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                      />
                      <span className="ml-2">{user.nilai}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal untuk menampilkan detail rating */}
      {showModal && selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ml-60">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full modal-enter ${
              !showModal && "modal-exit"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl ml-32 font-bold text-center text-green-700">
                Detail Rating
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {/* Tabel untuk Drama dan Rating */}
            <table className="min-w-full text-center table-auto">
              <thead>
                <tr className="bg-gray-200 rounded-lg">
                  <th className="px-4 py-2 text-gray-700">Drama</th>
                  <th className="px-4 py-2 text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-2 py-2 text-gray-800 border-b border">
                    {selectedRating.drama.nama}
                  </td>
                  <td className="px-4 py-2 text-green-600 border-b border">
                    {selectedRating.rating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Drama;
