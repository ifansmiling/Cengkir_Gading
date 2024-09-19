import React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
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

// Dummy data untuk grafik
const data = [
  { name: "Sep", Received: 20, Due: 30 },
  { name: "Oct", Received: 30, Due: 40 },
  { name: "Nov", Received: 40, Due: 50 },
  { name: "Dec", Received: 60, Due: 80 },
  { name: "Jan", Received: 70, Due: 90 },
  { name: "Feb", Received: 50, Due: 68 },
  { name: "Mar", Received: 68, Due: 70 },
  { name: "Apr", Received: 50, Due: 68 },
  { name: "May", Received: 80, Due: 90 },
  { name: "Jun", Received: 90, Due: 95 },
  { name: "Jul", Received: 85, Due: 100 },
  { name: "Aug", Received: 90, Due: 85 },
];

const DashboardAdmin = () => {
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
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <h2 className="text-2xl font-bold">2,300</h2>
                  <p className="text-green-500">+3% since last week</p>
                </div>
                <FaUsers className="text-4xl text-red-500 bg-red-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Skenario Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold">$53,000</h2>
                  <p className="text-green-500">+55% since yesterday</p>
                </div>
                <FaFileAlt className="text-4xl text-purple-500 bg-purple-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Acara Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold">+3,462</h2>
                  <p className="text-red-500">-2% since last quarter</p>
                </div>
                <FaCalendarAlt className="text-4xl text-green-500 bg-green-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Exercise
                  </p>
                  <h2 className="text-2xl font-bold">$103,430</h2>
                  <p className="text-green-500">+5% than last month</p>
                </div>
                <FaDumbbell className="text-4xl text-orange-500 bg-orange-100 p-2 rounded-full" />
              </div>
            </div>
          </div>

          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Charts Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="colorReceived"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Received"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorReceived)"
                />
                <Area
                  type="monotone"
                  dataKey="Due"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorDue)"
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
