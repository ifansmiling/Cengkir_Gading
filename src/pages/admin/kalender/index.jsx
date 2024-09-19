import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Kalender = () => {
  const [kalenderAcaras, setKalenderAcaras] = useState([]);

  useEffect(() => {
    const fetchKalenderAcaras = async () => {
      try {
        const response = await api.get("/kalenderAcara");
        setKalenderAcaras(response.data);
      } catch (error) {
        console.error("Gagal mengambil data kalender acara:", error);
      }
    };

    fetchKalenderAcaras();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/kalender/create");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus acara ini?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/kalenderAcara/${id}`);
      setKalenderAcaras(kalenderAcaras.filter((event) => event.id !== id));
    } catch (error) {
      console.error(
        "Gagal menghapus acara:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/kalender/edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-8 relative w-max mx-auto font-dramatic-header">
          Kalender Acara
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <button
          className="font-dramatic-header flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
          onClick={handleClick}
        >
          <FaPlus className="mr-2" />
          <span>Kalender Acara</span>
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200 font-dramatic-header">
                <th className="py-2 px-4 border-b text-center">No</th>
                <th className="py-2 px-4 border-b text-center">Judul</th>
                <th className="py-2 px-4 border-b text-center">Tanggal</th>
                <th className="py-2 px-4 border-b text-center">Potret</th>
                <th className="py-2 px-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kalenderAcaras.map((event, index) => (
                <tr key={event.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center font-dramatic-header">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center font-dramatic-body-user">
                    {event.judul}
                  </td>
                  <td className="py-2 px-4 border-b text-center font-dramatic-body-user">
                    {new Date(event.tanggal_event).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {event.file_paths.length > 0 ? (
                      <div className="flex justify-center space-x-0">
                        {event.file_paths.map((filePath, i) => (
                          <img
                            key={i}
                            src={filePath}
                            alt={`${event.judul}-${i}`}
                            className="w-20 h-20 object-cover rounded m-0"
                          />
                        ))}
                      </div>
                    ) : (
                      <span>Gambar tidak tersedia</span>
                    )}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(event.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {kalenderAcaras.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center">
                    Tidak ada acara.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Kalender;
