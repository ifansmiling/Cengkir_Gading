import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filterType, setFilterType] = useState("Semua");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getOriginalFileName = (filePath) => {
    if (!filePath) return "Tidak Ada File";

    const fileName = filePath.split("/").pop();
    const cleanedFileName = fileName.replace(/^\d+-/, "");
    const fileNameWithoutExt = cleanedFileName.replace(/\.[^/.]+$/, "");

    return fileNameWithoutExt;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = exercises.filter((exercise) =>
      exercise.judul.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
    setDropdownOpen(false);

    const filtered = exercises.filter((exercise) =>
      type === "Semua" ? true : exercise.tipe === type
    );
    setFilteredExercises(filtered);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/exercise/create");
  };

  const handleEditClick = (id) => {
    navigate(`/admin/exercise/edit/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/daily-exercise");
        setExercises(response.data);
        setFilteredExercises(response.data);
      } catch (error) {
        console.error("Error fetching daily exercises", error);
      }
    };

    fetchData();
  }, []);

  const deleteExercise = async (id) => {
    try {
      await api.delete(`/daily-exercise/${id}`);

      const updatedExercises = exercises.filter(
        (exercise) => exercise.id !== id
      );
      setExercises(updatedExercises);
      setFilteredExercises(updatedExercises);
    } catch (error) {
      console.error("Error deleting exercise", error);
      alert("Gagal menghapus exercise.");
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus exercise ini?"
    );
    if (confirmDelete) {
      deleteExercise(id);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto mb-4">
            Daily Exercise
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
              placeholder="Cari judul..."
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
          className="flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
          onClick={handleClick}
        >
          <FaPlus className="mr-2" />
          <span>Tambah Exercise</span>
        </button>

        <table className="min-w-full bg-white border border-gray-300 text-center rounded-lg shadow-md mb-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Judul</th>
              <th className="py-2 px-4 border-b relative">
                Tipe
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <FaChevronDown />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {[
                      "Semua",
                      "Artikel",
                      "Buku",
                      "Teori-teori Akting",
                      "Video Tutorial",
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleFilterType(type)}
                        className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${
                          filterType === type
                            ? "bg-gray-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </th>
              <th className="py-2 px-4 border-b">File</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise, index) => (
                <tr key={exercise.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border text-center align-middle">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border text-center align-middle">
                    {exercise.judul}
                  </td>
                  <td className="py-2 px-6 border-b border text-center align-middle">
                    {exercise.tipe}
                  </td>
                  <td className="py-2 px-2 border-b border text-center align-middle">
                    {exercise.file_path && exercise.file_path.length > 0
                      ? exercise.file_path.map((path, idx) => (
                          <a
                            key={idx}
                            href={path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline block"
                          >
                            {getOriginalFileName(path)}
                          </a>
                        ))
                      : "Tidak Ada File"}
                  </td>
                  <td className="py-2 px-4 border-b text-center align-middle">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEditClick(exercise.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(exercise.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Exercise;
