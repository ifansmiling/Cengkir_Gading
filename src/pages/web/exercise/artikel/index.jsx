import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseArtikel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredArticles = data.filter(
          (article) => article.tipe === "Artikel"
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 bg-white">
        <h1 className=" mt-2 font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
          Daftar Semua Artikel
        </h1>
        <div className="grid gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-green-500 transition-all duration-300"
            >
              <h2 className="text-base font-semibold text-green-700 mb-2 font-dramatic-body-user">
                {article.judul}
              </h2>
              <p className="text-gray-700 mb-4 text-sm font-dramatic-body-user">
                {article.deskripsi}
              </p>
              <div className="flex items-center space-x-4">
                {article.file_path.map((file, index) => {
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
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExerciseArtikel;
