import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseAkting = () => {
  const [theories, setTheories] = useState([]);

  useEffect(() => {
    const fetchTheories = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredTheories = data.filter(
          (theory) => theory.tipe === "Teori-teori Akting"
        );
        setTheories(filteredTheories);
      } catch (error) {
        console.error("Error fetching acting theories:", error);
      }
    };

    fetchTheories();
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
          Teori-teori Akting
        </h1>
        <div className="rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-10">
          {theories.map((theory) => (
            <div
              key={theory.id}
              className="flex bg-gray-100 border border-white rounded-lg shadow-lg hover:border-green-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-1/3 p-4 flex items-center rounded-lg justify-center bg-blue-400">
                <h2 className="text-base font-bold text-gray-800 font-dramatic-body-user">
                  {theory.judul}
                </h2>
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-between">
                <p className="text-gray-700 mb-4 font-dramatic-body-user text-sm text-justify">
                  {theory.deskripsi}
                </p>
                <div className="flex flex-col items-end space-y-2">
                  {theory.file_path.map((file, index) => {
                    const fileExtension = file.split(".").pop();
                    const isPdf = fileExtension === "pdf";
                    const isWord =
                      fileExtension === "docx" || fileExtension === "doc";

                    return isPdf || isWord ? (
                      <a
                        key={index}
                        href={file}
                        className={`font-dramatic-subtitle text-base ${
                          isPdf ? "text-red-700" : "text-blue-700"
                        } hover:underline`}
                        download
                      >
                        Download {isPdf ? "PDF" : "Word"}
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExerciseAkting;
