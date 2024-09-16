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

          <div className="ml-10 mr-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skenarioList.map((skenario) => (
              <div
                key={skenario.id}
                className="border border-gray-300 shadow-sm hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:border-green-600"
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 font-dramatic-header">
                      <h2 className="text-base font-bold text-gray-700 ">
                        {skenario.judul}
                      </h2>
                      {skenario.file_paths[0].endsWith(".pdf") ? (
                        <FaFilePdf className="text-red-600 text-2xl" />
                      ) : (
                        <FaFileWord className="text-blue-600 text-2xl" />
                      )}
                    </div>
                    <p className="text-gray-500 mb-6 text-sm text-justify font-event-body">
                      {skenario.deskripsi}
                    </p>
                  </div>
                  <a
                    href={skenario.file_paths[0]}
                    download
                    className="text-base font-event-body inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white text-center w-full py-2 rounded-lg shadow-sm hover:from-blue-600 hover:to-green-600 transition-all duration-300"
                  >
                    Unduh{" "}
                    {skenario.file_paths[0].split(".").pop().toUpperCase()} File
                  </a>
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
