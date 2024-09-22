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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

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

  // Pagination state for both tables
  const [activePageParameters, setActivePageParameters] = useState(1);
  const [activePageUsers, setActivePageUsers] = useState(1);
  const [activePageRatings, setActivePageRatings] = useState(1);
  const itemsPerPage = 10;

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

        const updatedUsers = usersWithRoleUser.map((user) => {
          const hasRating = userRatings.some(
            (rating) => rating.user_id === user.id
          );
          return { ...user, sudahDirating: hasRating };
        });

        const sortedUsers = updatedUsers.sort((a, b) => {
          return a.sudahDirating === b.sudahDirating
            ? 0
            : a.sudahDirating
            ? 1
            : -1;
        });

        setFilteredUsers(sortedUsers);
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

        const ratings = response.data.data;

        const groupedRatings = ratings.reduce((acc, rating) => {
          if (!acc[rating.user_id]) {
            acc[rating.user_id] = {
              user_id: rating.user_id,
              nama: rating.user.nama,
              nim: rating.user.nim,
              ratings: [],
            };
          }
          acc[rating.user_id].ratings.push({
            parameter_id: rating.parameter_id,
            rating: rating.rating,
            drama: rating.drama.nama,
          });
          return acc;
        }, {});

        const uniqueUserRatings = Object.values(groupedRatings);

        setUserRatings(uniqueUserRatings);
        setFilteredRatings(uniqueUserRatings);
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

  const handleDeleteUserRating = async (userId, parameterIds) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus semua rating pengguna ini dengan parameter yang diberikan?"
      )
    ) {
      try {
        const response = await api.delete(`/user-rating`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            user_id: userId,
            parameter_ids: parameterIds,
          },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          alert("User Rating berhasil dihapus.");

          setUserRatings((prevRatings) =>
            prevRatings.filter((rating) => rating.user_id !== userId)
          );
          setFilteredRatings((prevRatings) =>
            prevRatings.filter((rating) => rating.user_id !== userId)
          );
        }
      } catch (error) {
        console.error("Gagal menghapus User Rating:", error);
        alert("Terjadi kesalahan saat menghapus User Rating.");
      }
    }
  };

  const handleEditRating = (userId) => {
    navigate(`/admin/drama/rating/edit/${userId}`);
  };

  // Pagination logic function
  const paginate = (items, activePage, itemsPerPage) => {
    const start = (activePage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  // Inside your component
  const currentParameters = paginate(
    parameters,
    activePageParameters,
    itemsPerPage
  );
  const currentUsers = paginate(filteredUsers, activePageUsers, itemsPerPage);
  const currentRatings = paginate(
    filteredRatings,
    activePageRatings,
    itemsPerPage
  );

  const totalPagesParameters = Math.ceil(parameters.length / itemsPerPage);
  const totalPagesUsers = Math.ceil(filteredUsers.length / itemsPerPage);
  const totalPagesRatings = Math.ceil(filteredRatings.length / itemsPerPage);

  // SimplePagination component
  const SimplePagination = ({ activePage, setActivePage, totalPages }) => {
    const next = () => {
      if (activePage < totalPages) {
        setActivePage(activePage + 1);
      }
    };

    const prev = () => {
      if (activePage > 1) {
        setActivePage(activePage - 1);
      }
    };

    return (
      <div className="flex items-center justify-center gap-4 mt-4 mb-6">
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

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b font-dramatic-header-user text-center">
                  No
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Nama
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  NIM
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Rating Anggota
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRatings.map((user, index) => (
                <tr
                  key={user.user_id}
                  className="text-center hover:bg-gray-100 font-dramatic-header-user"
                >
                  <td className="py-2 px-4 border-b border">
                    {(activePageRatings - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4 border-b font-event-body border">
                    {user.nama}
                  </td>
                  <td className="py-2 px-4 border-b font-event-body border">
                    {user.nim}
                  </td>
                  <td className="py-2 px-4 border-b text-center border">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-green-500 text-xl cursor-pointer"
                      onClick={() => handleIconClick(user.user_id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditRating(user.user_id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          handleDeleteUserRating(
                            user.user_id,
                            user.ratings.map((r) => r.parameter_id)
                          )
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <SimplePagination
            activePage={activePageRatings}
            setActivePage={setActivePageRatings}
            totalPages={totalPagesRatings}
          />
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
                <h3 className="text-lg font-dramatic-header">Nama Pengguna:</h3>
                <p className="text-gray-700 mb-4 font-event-body">
                  {selectedUserName}
                </p>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border-b text-center font-event-header">
                        Parameter
                      </th>
                      <th className="py-2 px-4 border-b text-center font-event-header">
                        Nilai
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserRatings.length > 0 ? (
                      selectedUserRatings.map((rating) => (
                        <tr key={rating.id}>
                          <td className="py-2 px-4 border-b text-center font-natural-body">
                            {rating.drama
                              ? rating.drama.nama
                              : "Unknown Parameter"}
                          </td>
                          <td className="py-2 px-4 border-b text-center text-green-600 font-dramatic-header">
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
                <th className="py-2 px-4 border-b font-dramatic-header-user text-center">
                  No
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Nama
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  NIM
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Status Rating
                </th>
                <th className="py-2 px-4 border-b font-event-header text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                const hasRated = userRatings.some(
                  (rating) => rating.user_id === user.id
                );
                return (
                  <tr key={user.id} className="text-center hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border font-dramatic-header-user">
                      {(activePageUsers - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border font-event-body">
                      {user.nama}
                    </td>
                    <td className="py-2 px-4 border-b border font-event-body">
                      {user.nim}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={
                          hasRated
                            ? "text-green-500 font-dramatic-header"
                            : "text-red-500 font-dramatic-header"
                        }
                      >
                        {hasRated ? "Sudah Ada Rating" : "Belum Ada Rating"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center border">
                      <div className="flex justify-center items-center h-full">
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-green-600 text-xl hover:text-green-900 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                          onClick={() => handleClickRating(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <SimplePagination
            activePage={activePageUsers}
            setActivePage={setActivePageUsers}
            totalPages={totalPagesUsers}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Daftar Parameter
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <button
          className="font-event-header flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
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
                <th className="py-2 px-4 border-b text-center font-dramatic-header">
                  No
                </th>
                <th className="py-2 px-4 border-b text-center font-dramatic-header">
                  Nama Parameter
                </th>
                <th className="py-2 px-4 border-b text-center font-dramatic-header">
                  Deskripsi
                </th>
                <th className="py-2 px-4 border-b text-center font-dramatic-header">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentParameters.map((parameter, index) => (
                <tr
                  key={parameter.id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border-b border font-dramatic-header">
                    {(activePageParameters - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border font-dramatic-body-user">
                    {parameter.nama}
                  </td>
                  <td className="py-2 px-4 border-b border font-dramatic-body-user">
                    {parameter.deskripsi}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center gap-2">
                      <button
                        className="text-green-600 hover:text-green-900"
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
          <SimplePagination
            activePage={activePageParameters}
            setActivePage={setActivePageParameters}
            totalPages={totalPagesParameters}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Drama;
