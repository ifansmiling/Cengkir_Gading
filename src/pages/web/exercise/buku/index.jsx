import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ExerciseBuku = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-10">
          <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
            Daftar Semua Buku
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} openModal={openModal} />
          ))}
        </div>

        {isModalOpen && selectedBook && (
          <Modal book={selectedBook} closeModal={closeModal} />
        )}
      </div>
    </UserLayout>
  );
};

const BookCard = ({ book, openModal }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:border-green-500">
      <div className="p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2 font-dramatic-body-user">
          {book.judul}
        </h2>
        <p className="text-sm text-gray-600 mb-2 leading-relaxed font-dramatic-body-user">
          {`${book.deskripsi.slice(0, 100)}...`}
        </p>
        <button
          className="text-blue-600 text-sm font-semibold hover:underline focus:outline-none font-natural-body"
          onClick={() => openModal(book)}
        >
          Lihat Selengkapnya
        </button>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        {book.file_path.map((file, index) => {
          const fileExtension = file.split(".").pop();
          const isPdf = fileExtension === "pdf";
          const isWord = fileExtension === "docx" || fileExtension === "doc";

          return isPdf || isWord ? (
            <a
              key={index}
              href={file}
              className={`font-dramatic-body text-sm ${
                isPdf ? "text-red-700" : "text-blue-700"
              } hover:underline`}
              download
            >
              {isPdf ? "Download PDF" : "Download Word"}
            </a>
          ) : null;
        })}
        <span className="text-gray-500 text-xs">Free</span>
      </div>
    </div>
  );
};

const Modal = ({ book, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-out">
      <div className="bg-white border border-green-600 rounded-lg p-6 shadow-lg transform transition-transform duration-300 ease-in-out scale-95 max-w-lg mx-auto">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 font-dramatic-header">
            {book.judul}
          </h2>
        </div>
        <p className="text-gray-700 text-sm text-justify leading-relaxed font-dramatic-header">
          {book.deskripsi}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="text-green-700 hover:text-green-900 px-4 py-2 rounded-lg transition-colors focus:outline-none"
            onClick={closeModal}
          >
            <i className="fas fa-circle-xmark text-2xl"></i>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseBuku;
