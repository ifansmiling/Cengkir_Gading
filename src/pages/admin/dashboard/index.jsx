import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaUsers, FaFileAlt, FaCalendarAlt, FaDumbbell } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DashboardAdmin = () => {
  const [totalUsers, setTotalUsers] = useState(0); // State untuk total users
  const [totalSkenario, setTotalSkenario] = useState(0); // State untuk total skenario
  const [totalKalenderAcara, setTotalKalenderAcara] = useState(0); // State untuk total acara bulan ini
  const [totalExercise, setTotalExercise] = useState(0); // State untuk total exercise
  const [kalenderAcaraPerMonth, setKalenderAcaraPerMonth] = useState([]); // Data Kalender Acara per bulan
  const [skenarioPerMonth, setSkenarioPerMonth] = useState([]); // Data Skenario per bulan

  // Fetch data dari API saat komponen di-mount
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await api.get("/user/count/total");
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    const fetchTotalSkenario = async () => {
      try {
        const response = await api.get("/skenario/count/month");
        setTotalSkenario(response.data.totalSkenario);
      } catch (error) {
        console.error("Error fetching total skenario:", error);
      }
    };

    const fetchTotalKalenderAcara = async () => {
      try {
        const response = await api.get(
          "/kalenderAcara/mounth/this-month/total"
        );
        setTotalKalenderAcara(response.data.totalKalenderAcara);
      } catch (error) {
        console.error("Error fetching total acara bulan ini:", error);
      }
    };

    const fetchTotalExercise = async () => {
      try {
        const response = await api.get("/daily-exercise/all/exercise");
        setTotalExercise(response.data.total);
      } catch (error) {
        console.error("Error fetching total exercise:", error);
      }
    };

    // Fetch Kalender Acara per Month
    const fetchKalenderAcaraPerMonth = async () => {
      try {
        const response = await api.get("/kalenderAcara/per-month/total");
        const kalenderData = response.data["2024"]; // Adjust for specific year
        const formattedData = Object.keys(kalenderData).map((month) => ({
          name: monthNames[parseInt(month) - 1], // Ambil nama bulan sesuai dengan angkanya
          KalenderAcara: kalenderData[month].length,
        }));
        setKalenderAcaraPerMonth(formattedData);
      } catch (error) {
        console.error("Error fetching kalender acara per bulan:", error);
      }
    };

    // Fetch Skenario per Bulan
    const fetchSkenarioPerMonth = async () => {
      try {
        const response = await api.get("/skenario/count/month/year");
        const skenarioData = response.data.totalSkenarioPerMonth;
        const formattedData = Object.keys(skenarioData).map((month) => ({
          name: monthNames[parseInt(month) - 1], // Ambil nama bulan sesuai dengan angkanya
          Skenario: skenarioData[month],
        }));
        setSkenarioPerMonth(formattedData);
      } catch (error) {
        console.error("Error fetching skenario per bulan:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalSkenario();
    fetchTotalKalenderAcara();
    fetchTotalExercise();
    fetchKalenderAcaraPerMonth();
    fetchSkenarioPerMonth();
  }, []);

  // Gabungkan data Kalender Acara dan Skenario berdasarkan bulan
  const chartData = kalenderAcaraPerMonth.map((acaraData) => {
    const skenarioData = skenarioPerMonth.find(
      (skenario) => skenario.name === acaraData.name
    );
    return {
      name: acaraData.name,
      KalenderAcara: acaraData.KalenderAcara || 0,
      Skenario: skenarioData ? skenarioData.Skenario : 0,
    };
  });

  return (
    <AdminLayout>
      <div className="min-h-screen bg-blue-100">
        {/* Top navigation */}
        <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type here..."
              className="px-4 py-2 rounded-lg text-black"
            />
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Card 1 - Total Users */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <h2 className="text-2xl font-bold">{totalUsers}</h2>
                  <p className="text-green-500">+3% since last week</p>
                </div>
                <FaUsers className="text-4xl text-red-500 bg-red-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 2 - Skenario Bulan Ini */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Skenario Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold">{totalSkenario}</h2>
                  <p className="text-green-500">+55% since yesterday</p>
                </div>
                <FaFileAlt className="text-4xl text-purple-500 bg-purple-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 3 - Acara Bulan Ini */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Acara Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold">{totalKalenderAcara}</h2>
                  <p className="text-red-500">-2% since last quarter</p>
                </div>
                <FaCalendarAlt className="text-4xl text-green-500 bg-green-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 4 - Total Exercise */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Exercise
                  </p>
                  <h2 className="text-2xl font-bold">{totalExercise}</h2>
                  <p className="text-green-500">+5% than last month</p>
                </div>
                <FaDumbbell className="text-4xl text-orange-500 bg-orange-100 p-2 rounded-full" />
              </div>
            </div>
          </div>

          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Kalender Acara dan Skenario per Bulan
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorKalenderAcara"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorSkenario"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="KalenderAcara"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorKalenderAcara)"
                />
                <Area
                  type="monotone"
                  dataKey="Skenario"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorSkenario)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
