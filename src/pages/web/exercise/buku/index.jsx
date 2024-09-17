import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseBuku = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredBooks = data.filter((book) => book.tipe === "Buku");
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="mt-2 font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
          Daftar Semua Buku
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col bg-gray-100 border border-white rounded-lg shadow-lg hover:border-green-600 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Bagian judul */}
              <div className="p-4 flex items-center justify-center bg-blue-400 rounded-t-lg">
                <h2 className="text-base font-bold text-gray-800 font-dramatic-body-user">
                  {book.judul}
                </h2>
              </div>
              {/* Bagian deskripsi */}
              <div className="p-6 flex-1">
                <p className="text-gray-700 mb-4 font-dramatic-body-user text-sm text-justify">
                  {book.deskripsi}
                </p>
              </div>
              {/* Bagian link download */}
              <div className="p-4 flex justify-end items-end">
                {book.file_path.map((file, index) => {
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

export default ExerciseBuku;
