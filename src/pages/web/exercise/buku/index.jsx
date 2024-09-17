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
      <div className="container mx-auto px-4 py-6 bg-white">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
          Daftar Semua Buku
        </h1>
        <div className="grid gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-gray-300 rounded-lg p-5 shadow-lg hover:border-green-500 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-base font-semibold text-green-700 mb-2 font-dramatic-body-user">
                {book.judul}
              </h2>
              <p className="text-black mb-3 font-dramatic-body-user text-sm">
                {book.deskripsi}
              </p>
              <div className="flex items-center space-x-4">
                {book.file_path.map((file, index) => {
                  const fileExtension = file.split(".").pop();
                  const isPdf = fileExtension === "pdf";
                  const isWord =
                    fileExtension === "docx" || fileExtension === "doc";

                  return isPdf || isWord ? (
                    <a
                      key={index}
                      href={file}
                      className={`font-dramatic-subtitle text-base text-${
                        isPdf ? "red" : "blue"
                      }-600 hover:underline`}
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
