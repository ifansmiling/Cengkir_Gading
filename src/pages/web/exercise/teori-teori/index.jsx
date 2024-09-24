import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseAkting = () => {
  const [theories, setTheories] = useState([]);
  const [expandedTheoryId, setExpandedTheoryId] = useState(null);

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

  const toggleDescription = (id) => {
    setExpandedTheoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
          Teori-teori Akting
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {theories.map((theory) => {
            const isExpanded = expandedTheoryId === theory.id;
            return (
              <div
                key={theory.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500"
              >
                <div className="p-4 bg-blue-200 rounded-t-lg">
                  <h2 className="text-base font-dramatic-body-user font-bold text-gray-900">
                    {theory.judul}
                  </h2>
                </div>
                <div className="p-6">
                  <p
                    className={`text-gray-700 font-dramatic-body-user text-justify text-sm ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {theory.deskripsi}
                  </p>
                  <button
                    onClick={() => toggleDescription(theory.id)}
                    className="mt-2 text-sm text-blue-900 hover:underline"
                  >
                    {isExpanded ? "Lihat lebih sedikit" : "Lihat selengkapnya"}
                  </button>
                  <div className="mt-4 flex flex-col space-y-2">
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
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExerciseAkting;
