import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Drama = () => {
  // State untuk menyimpan data drama dan user rating
  const [dramaData, setDramaData] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mendapatkan userId dari localStorage
  const userId = localStorage.getItem("id");

  // Fungsi untuk mengambil data drama dari backend
  const fetchDramaData = async () => {
    try {
      const response = await api.get("/drama");
      setDramaData(response.data);
    } catch (error) {
      console.error("Error fetching drama data:", error);
    }
  };

  // Fungsi untuk mengambil data rating user berdasarkan userId
  const fetchUserRatings = async () => {
    try {
      const response = await api.get(`/userRating/user/rating/${userId}`);
      setUserRatings(response.data);
    } catch (error) {
      console.error("Error fetching user ratings:", error);
    }
  };

  // UseEffect untuk menjalankan fetch data saat komponen mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDramaData();
      await fetchUserRatings();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Atau tambahkan loader
  }

  // Jika data rating user kosong atau belum ada
  if (userRatings.length === 0) {
    return (
      <UserLayout>
        <div className="bg-white p-8 rounded-lg max-w-5xl mx-auto mt-2">
          <h1 className="text-2xl font-bold text-green-800 mb-6 underline decoration-green-800">
            Perpustakaan Drama
          </h1>
          <p>Belum Ada Rating</p>
        </div>
      </UserLayout>
    );
  }

  const borderColor = "#34d399";

  // Ekstraksi nilai rating dari userRatings
  const nilaiAktor1 = userRatings.map((rating) => rating.rating);

  // Menghitung rata-rata nilai Aktor 1
  const rataRataNilai =
    nilaiAktor1.reduce((a, b) => a + b, 0) / nilaiAktor1.length;

  // Data chart untuk radar
  const data = {
    labels: dramaData.map((drama) => drama.nama), // Menggunakan nama drama dari backend
    datasets: [
      {
        label: "Nilai Parameter",
        data: nilaiAktor1,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Rata-Rata Nilai",
        data: Array(nilaiAktor1.length).fill(rataRataNilai), // Data rata-rata untuk semua parameter
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <UserLayout>
      {/* Container utama dengan background putih */}
      <div className="bg-white p-8 rounded-lg max-w-5xl mx-auto mt-2">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-4 underline underline-offset-2 decoration-green-800">
          Perpustakaan Drama
        </h1>

        {/* Deskripsi fitur */}
        <p className="text-gray-700 mb-8 text-base text-justify font-dramatic-body-user">
          Kami menyajikan laporan mendetail mengenai kinerja dan statistik
          individu dalam berbagai latihan. Data yang ditampilkan mencakup
          penilaian terhadap berbagai parameter penting seperti parameter yang
          sudah ada. Memberikan gambaran menyeluruh mengenai kemajuan dan
          keterampilan individu. Data yang dihimpun diolah dengan menggunakan
          metode SCRUM untuk memberikan wawasan yang lebih mendalam mengenai
          area kekuatan dan kesempatan perbaikan. Melalui fitur ini, kalian
          dapat dengan mudah memantau dan mengevaluasi pencapaian serta progres
          latihan dari waktu ke waktu.
        </p>

        {/* Chart Radar untuk menampilkan parameter */}
        <div className="w-full max-w-lg mx-auto mb-4 font-dramatic-header-user">
          <Radar data={data} options={{ maintainAspectRatio: true }} />
        </div>

        {/* Tabel untuk menampilkan nilai parameter */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-separate border-spacing-0 border-green-500 mx-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border-b border-green-500 p-4 text-left font-dramatic-body-user font-sm">
                  Parameter
                </th>
                <th className="border-b border-green-500 p-4 text-center font-dramatic-body-user font-sm">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {dramaData.map((drama, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-green-100 transition-colors duration-200`}
                >
                  <td className="border-b border-green-500 p-4 text-left font-dramatic-body-user font-sm">
                    {drama.nama}
                  </td>
                  <td className="border-b border-green-500 p-4 text-center font-dramatic-body-user font-sm">
                    {nilaiAktor1[index]}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200">
                <td className="border-b border-green-500 p-4 font-bold text-left font-dramatic-body-user font-sm">
                  Rata-Rata
                </td>
                <td className="border-b border-green-500 p-4 font-bold text-center font-dramatic-body-user font-sm">
                  {rataRataNilai.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
};

export default Drama;
