import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";

const KalenderAcara = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/kalenderAcara");

        // Sort events by date in ascending order (upcoming first)
        const sortedEvents = response.data.sort((b, a) => {
          return new Date(a.tanggal_event) - new Date(b.tanggal_event);
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <UserLayout>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex justify-center mb-10">
          <h1 className="font-dramatic-header text-3xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
            Kalender Acara
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const { day, month, year } = formatDate(event.tanggal_event);
            return (
              <div
                key={event.id}
                className="bg-white shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg"
              >
                <div>
                  <div className="relative">
                    <img
                      src={event.file_paths[0]}
                      alt={event.judul}
                      className="font-dramatic-header-user w-full h-56 object-cover cursor-pointer"
                      onClick={() => handleImageClick(event.file_paths[0])}
                    />
                    <div className="absolute top-4 left-4 bg-black text-white text-center p-2 rounded-lg">
                      <span className="block text-sm font-bold">{month}</span>
                      <span className="block text-2xl font-extrabold">
                        {day}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-dramatic-body-user text-lg font-bold text-gray-800 mt-2">
                      {event.judul}
                    </h3>
                    <p className="font-sans text-xs text-gray-600 text-justify mt-1">
                      {event.deskripsi}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-event-subtext text-sm text-green-700">
                    Tel-U Purwokerto {event.room}
                  </p>
                  <p className="text-xs text-green-700">
                    Event Date: {day} {month}, {year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${
              isModalOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`relative transform transition-transform duration-300 ease-in-out ${
                isModalOpen ? "scale-100" : "scale-95"
              }`}
            >
              <img
                src={selectedImage}
                alt="Selected event"
                className="w-full max-w-sm h-auto object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full focus:outline-none focus:ring-0"
                onClick={handleCloseModal}
              >
                <span className="text-black">✖</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default KalenderAcara;
