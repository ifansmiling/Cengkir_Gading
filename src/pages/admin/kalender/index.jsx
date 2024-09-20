import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Kalender = () => {
  const [kalenderAcaras, setKalenderAcaras] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchKalenderAcaras = async () => {
      try {
        const response = await api.get("/kalenderAcara");
        const sortedData = response.data.sort(
          (a, b) => new Date(b.tanggal_event) - new Date(a.tanggal_event)
        );
        setKalenderAcaras(sortedData);
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

  // Pagination logic
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKalenderAcaras = kalenderAcaras.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(kalenderAcaras.length / itemsPerPage);

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
              {currentKalenderAcaras.map((event, index) => (
                <tr key={event.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center font-dramatic-header">
                    {index + 1 + indexOfFirstItem}
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
        {/* Pagination */}
        <SimplePagination />
      </div>
    </AdminLayout>
  );
};

export default Kalender;
