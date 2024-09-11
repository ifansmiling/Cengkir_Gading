import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

import "./ModalTransisition.css";

const Drama = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserRatings, setSelectedUserRatings] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");

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
          (user) => user.role === "User"
        );
        setFilteredUsers(usersWithRoleUser);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    const fetchParameters = async () => {
      try {
        const response = await api.get("/drama", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setParameters(response.data);
      } catch (error) {
        console.error("Gagal mengambil data parameter:", error);
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

        const uniqueRatings = response.data.data.filter(
          (rating, index, self) =>
            index === self.findIndex((r) => r.user.nama === rating.user.nama)
        );

        setUserRatings(uniqueRatings);
        setFilteredRatings(uniqueRatings);
      } catch (error) {
        console.error("Gagal mengambil data user rating:", error);
      }
    };

    fetchUsers();
    fetchParameters();
    fetchUserRatings();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = userRatings.filter(
        (rating) =>
          rating.user &&
          rating.user.nama &&
          rating.user.nama.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRatings(filtered);
    } else {
      setFilteredRatings(userRatings);
    }
  };

  const openModal = async (userId) => {
    try {
      const response = await api.get(`/user-rating/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Data dari API:", response.data);

      // Memastikan data dari API disimpan di state dengan benar
      setSelectedUserRatings(response.data.data || []);
      setSelectedUserName(
        response.data.data.find((rating) => rating.user_id === userId)?.user
          ?.nama || ""
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal mengambil rating pengguna:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserRatings([]);
    setSelectedUserName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ target: { value: searchTerm } });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/drama/parameter/create");
  };

  const handleEditParameter = (id) => {
    navigate(`/admin/drama/parameter/edit/${id}`);
  };

  const handleDeleteParameter = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await api.delete(`/drama/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setParameters(parameters.filter((parameter) => parameter.id !== id));
          alert("Drama berhasil dihapus.");
        }
      } catch (error) {
        console.error("Gagal menghapus drama:", error);
        alert("Terjadi kesalahan saat menghapus drama.");
      }
    }
  };

  const handleIconClick = (userId) => {
    openModal(userId);
  };

  const handleClickRating = (userId) => {
    navigate(`/admin/drama/rating/create/${userId}`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Perpustakaan Drama
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

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-6">
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
              {filteredRatings.map((rating, index) => (
                <tr key={rating.id} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border">{index + 1}</td>
                  <td className="py-2 px-4 border-b border">
                    {rating.user.nama}
                  </td>
                  <td className="py-2 px-4 border-b border">
                    {rating.user.nim}
                  </td>
                  <td className="py-2 px-4 border-b text-center border">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-500 text-xl cursor-pointer"
                      onClick={() => handleIconClick(rating.user_id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditRating(rating.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteRating(rating.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 relative ml-52">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2 className="text-2xl font-dramatic-header font-bold text-center text-green-800 mb-4">
                Detail Penilaian
              </h2>
              <div>
                <h3 className="text-lg font-medium">Nama Pengguna:</h3>
                <p className="text-gray-700 mb-4">{selectedUserName}</p>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border-b text-center">
                        Parameter
                      </th>
                      <th className="py-2 px-4 border-b text-center">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserRatings.length > 0 ? (
                      selectedUserRatings.map((rating) => (
                        <tr key={rating.id}>
                          <td className="py-2 px-4 border-b text-center">
                            {rating.drama
                              ? rating.drama.nama
                              : "Unknown Parameter"}
                          </td>
                          <td className="py-2 px-4 border-b text-center text-green-600">
                            {rating.rating}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-2 px-4 border-b text-center"
                        >
                          Data tidak tersedia
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Daftar Anggota
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-6">
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
                        icon={faPlus}
                        className="text-blue-500 text-xl hover:text-blue-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                        onClick={() => handleClickRating(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Daftar Parameter
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <button
          className="flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
          onClick={handleClick}
        >
          <FaPlus className="mr-2" />
          <span>Tambah Parameter</span>
        </button>

        {/* Tabel Daftar Parameter */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-center">No</th>
                <th className="py-2 px-4 border-b text-center">
                  Nama Parameter
                </th>
                <th className="py-2 px-4 border-b text-center">Deskripsi</th>
                <th className="py-2 px-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((parameter, index) => (
                <tr
                  key={parameter.id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border-b border">{index + 1}</td>
                  <td className="py-2 px-4 border-b border">
                    {parameter.nama}
                  </td>
                  <td className="py-2 px-4 border-b border">
                    {parameter.deskripsi}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditParameter(parameter.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteParameter(parameter.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default Drama;
