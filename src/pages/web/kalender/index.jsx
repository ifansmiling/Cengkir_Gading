import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";

const KalenderAcara = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/kalenderAcara");
        setEvents(response.data);
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

  return (
    <UserLayout>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex justify-center mb-10">
          <h1 className="font-event-header text-3xl font-bold text-green-800 border-b-2 border-green-800 inline-block">
            Kalender Acara
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const { day, month, year } = formatDate(event.tanggal_event);
            return (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <img
                      src={event.file_paths[0]}
                      alt={event.judul}
                      className="font-dramatic-header-user w-full h-42 object-cover"
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
      </div>
    </UserLayout>
  );
};

export default KalenderAcara;
