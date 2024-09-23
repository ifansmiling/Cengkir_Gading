import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import api from "../../../services/api";

const Skenario = () => {
  const [skenarioList, setSkenarioList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkenario = async () => {
      try {
        const response = await api.get("/skenario");
        setSkenarioList(response.data);
      } catch (error) {
        console.error("Gagal memuat data skenario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkenario();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-700">Memuat data...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="bg-white min-h-screen py-12 px-6">
        <div className="container mx-auto">
          <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
            Perpustakaan Skenario
          </h1>

          {/* Grid container dengan gap dan padding */}
          <div className="ml-10 mr-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skenarioList.map((skenario) => (
              <div
                key={skenario.id}
                className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white transition-shadow duration-300 hover:shadow-xl hover:border-green-500"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4 font-dramatic-header">
                      <h2 className="text-lg font-semibold text-gray-800 truncate">
                        {skenario.judul}
                      </h2>
                      {/* Icon file pdf/word */}
                      {skenario.file_paths[0].endsWith(".pdf") ? (
                        <FaFilePdf className="text-red-600 text-2xl" />
                      ) : (
                        <FaFileWord className="text-blue-600 text-2xl" />
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-event-body">
                      {skenario.deskripsi}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-gray-500 text-sm mb-2 font-event-body">
                      Untuk lebih lengkapnya bisa download file di bawah ini:
                    </p>

                    <a
                      href={skenario.file_paths[0]}
                      download
                      className={`inline-block w-full text-center text-white py-1.5 px-4 rounded-md text-sm shadow-sm transition-all duration-300 font-event-body
                       ${
                         skenario.file_paths[0].endsWith(".pdf")
                           ? "bg-red-800 hover:bg-red-900 focus:ring-white"
                           : "bg-blue-800 hover:bg-blue-900 focus:ring-blue-500"
                       }
                       focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      Unduh{" "}
                      {skenario.file_paths[0].split(".").pop().toUpperCase()}{" "}
                      File
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Skenario;
