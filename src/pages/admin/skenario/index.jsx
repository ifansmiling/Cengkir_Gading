import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Skenario = () => {
  const [skenarios, setSkenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkenarios, setFilteredSkenarios] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkenarios = async () => {
      try {
        const response = await api.get("/skenario");
        setSkenarios(response.data);
        setFilteredSkenarios(response.data);
      } catch (error) {
        console.error("Failed to fetch skenarios", error);
      }
    };

    fetchSkenarios();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = skenarios.filter((skenario) =>
        skenario.judul.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkenarios(filtered);
    } else {
      setFilteredSkenarios(skenarios);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/skenario/edit/${id}`);
  };

  const extractFileName = (filePath) => {
    if (!filePath) return "Tidak ada file";

    const fileNameWithExt = filePath.split("/").pop();
    const fileName = fileNameWithExt.replace(/^\d+-/, "");

    return fileName.charAt(0).toUpperCase() + fileName.split(".")[0].slice(1);
  };

  const handleDeleteClick = async (id) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus skenario ini?")) {
        await api.delete(`/skenario/${id}`);
        setSkenarios(skenarios.filter((skenario) => skenario.id !== id));
        setFilteredSkenarios(
          filteredSkenarios.filter((skenario) => skenario.id !== id)
        );
        alert("Skenario berhasil dihapus");
      }
    } catch (error) {
      console.error("Failed to delete skenario", error);
      alert("Gagal menghapus skenario");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-center relative w-max mx-auto font-dramatic-header">
            Perpustakaan Skenario
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
          onClick={() => navigate("/admin/skenario/create")}
        >
          <FaPlus className="mr-2" />
          <span>Tambah Skenario</span>
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-center">No</th>
                <th className="px-4 py-2 border text-center">Judul</th>
                <th className="px-4 py-2 border text-center">Deskripsi</th>
                <th className="px-4 py-2 border text-center">Naskah Drama</th>
                <th className="px-4 py-2 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkenarios.map((skenario, index) => (
                <tr key={skenario.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-2 py-2 border text-center">
                    {skenario.judul}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {skenario.deskripsi}
                  </td>
                  <td className="px-2 py-2 border text-center">
                    {skenario.file_paths.length > 0 ? (
                      <div className="flex flex-col">
                        {skenario.file_paths.map((filePath, i) => (
                          <a
                            key={i}
                            href={filePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {extractFileName(filePath)}
                          </a>
                        ))}
                      </div>
                    ) : (
                      "Tidak ada file"
                    )}
                  </td>
                  <td className="px-6 py-2 border text-center align-middle">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(skenario.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(skenario.id)}
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

export default Skenario;
