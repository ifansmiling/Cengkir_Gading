import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Kalender = () => {
  const [kalenderAcaras, setKalenderAcaras] = useState([]);

  useEffect(() => {
    const fetchKalenderAcaras = async () => {
      try {
        const response = await api.get("/kalenderAcara");
        setKalenderAcaras(response.data);
      } catch (error) {
        console.error("Failed to fetch kalender acara:", error);
      }
    };

    fetchKalenderAcaras();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-dramatic-header-user font-bold text-center mb-8 relative w-max mx-auto">
          Kalender Acara
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <button className="flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3">
          <FaPlus className="mr-2" />
          <span>Kalender Acara</span>
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
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
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {event.judul}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(event.tanggal_event).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {event.file_path ? (
                      <img
                        src={event.file_path}
                        alt={event.judul}
                        className="w-20 h-20 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span>Gambar tidak tersedia</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
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
              {kalenderAcaras.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center">
                    No events found.
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
