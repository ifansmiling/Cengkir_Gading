import React from "react";
import {
  FaEye,
  FaDollarSign,
  FaUserPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AdminLayout from "../../../layouts/AdminLayout";

// Registering components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for the Line Chart
  const lineChartData = {
    labels: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    datasets: [
      {
        label: "Total Revenue",
        data: [
          3000, 3500, 4000, 4500, 4200, 5000, 5500, 6000, 6400, 7000, 7500,
          8000,
        ],
        borderColor: "rgba(0, 102, 255, 1)",
        backgroundColor: "rgba(0, 102, 255, 0.2)",
        pointRadius: 5,
      },
    ],
  };

  // Data for the Bar Chart
  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Profit",
        data: [500, 600, 750, 700, 850, 900, 950],
        backgroundColor: "rgba(0, 204, 255, 1)",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100">
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Card 1 */}
          <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Total Views</h4>
              <h2 className="text-2xl font-semibold text-gray-800">3.456K</h2>
              <p className="text-sm text-green-500 mt-1">0.43% ↑</p>
            </div>
            <div className="text-3xl text-blue-500">
              <FaEye className="w-10 h-10" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Total Profit
              </h4>
              <h2 className="text-2xl font-semibold text-gray-800">$45.2K</h2>
              <p className="text-sm text-green-500 mt-1">4.35% ↑</p>
            </div>
            <div className="text-3xl text-blue-500">
              <FaDollarSign className="w-10 h-10" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">New Users</h4>
              <h2 className="text-2xl font-semibold text-gray-800">1,234</h2>
              <p className="text-sm text-green-500 mt-1">5.67% ↑</p>
            </div>
            <div className="text-3xl text-blue-500">
              <FaUserPlus className="w-10 h-10" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Total Orders
              </h4>
              <h2 className="text-2xl font-semibold text-gray-800">789</h2>
              <p className="text-sm text-red-500 mt-1">1.23% ↓</p>
            </div>
            <div className="text-3xl text-blue-500">
              <FaShoppingCart className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Total Revenue
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-500">12.04.2022 - 12.05.2022</span>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-500">Day</button>
                <button className="text-sm text-gray-500">Week</button>
                <button className="text-sm text-gray-500">Month</button>
              </div>
            </div>
            <div>
              <Line data={lineChartData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Profit This Week
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">This Week</span>
            </div>
            <div>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
