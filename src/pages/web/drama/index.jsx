import React from "react";
import UserLayout from "../../../layouts/UserLayout";
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
  // Dummy data untuk chart
  const data = {
    labels: [
      "Kemampuan Akting",
      "Pengelolaan Jiwa",
      "Apresiasi Seni",
      "Improvisasi",
      "Kolaborasi Tim",
      "Kepercayaan Diri",
      "Desain Kostum & Panggung",
      "Penyutradaraan",
      "Penulisan Naskah",
      "Penguasaan Panggung",
      "Pengembangan Karakter",
    ],
    datasets: [
      {
        label: "Nilai Aktor 1",
        data: [85, 90, 75, 80, 95, 88, 92, 85, 79, 90, 84],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Nilai Aktor 2",
        data: [70, 80, 65, 90, 88, 80, 85, 70, 75, 85, 78],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Data tabel untuk setiap parameter dan nilai aktor
  const tableData = [
    { parameter: "Kemampuan Akting", nilaiAktor1: 85, nilaiAktor2: 70 },
    { parameter: "Pengelolaan Jiwa", nilaiAktor1: 90, nilaiAktor2: 80 },
    { parameter: "Apresiasi Seni", nilaiAktor1: 75, nilaiAktor2: 65 },
    { parameter: "Improvisasi", nilaiAktor1: 80, nilaiAktor2: 90 },
    { parameter: "Kolaborasi Tim", nilaiAktor1: 95, nilaiAktor2: 88 },
    { parameter: "Kepercayaan Diri", nilaiAktor1: 88, nilaiAktor2: 80 },
    { parameter: "Desain Kostum & Panggung", nilaiAktor1: 92, nilaiAktor2: 85 },
    { parameter: "Penyutradaraan", nilaiAktor1: 85, nilaiAktor2: 70 },
    { parameter: "Penulisan Naskah", nilaiAktor1: 79, nilaiAktor2: 75 },
    { parameter: "Penguasaan Panggung", nilaiAktor1: 90, nilaiAktor2: 85 },
    { parameter: "Pengembangan Karakter", nilaiAktor1: 84, nilaiAktor2: 78 },
  ];

  return (
    <UserLayout>
      {/* Container utama dengan background putih */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto mt-2">
        <h1 className="text-2xl font-bold text-green-800 mb-6 underline decoration-green-800">
          Perpustakaan Drama
        </h1>

        {/* Deskripsi fitur */}
        <p className="text-gray-700 mb-8 text-justify">
          Pada Fitur ini berupa laporan kinerja dan statistik yang melacak
          kemajuan individu dalam latihan. Admin akan menginputkan parameter
          pengelompokan untuk mengelompokkan para aktor berdasarkan berbagai
          parameter seperti kemampuan akting, pengelolaan jiwa, apresiasi seni,
          improvisasi, kolaborasi tim, kepercayaan diri, desain kostum dan
          panggung, penyutradaraan, penulisan naskah, penguasaan panggung,
          pengembangan karakter. Setiap parameter dinilai dari 1-100 dan hasil
          akhirnya akan diolah menggunakan metode SCRUM.
        </p>

        {/* Chart Radar untuk menampilkan parameter */}
        <div className="w-full max-w-lg mx-auto mb-8">
          <Radar data={data} options={{ maintainAspectRatio: true }} />
        </div>

        {/* Tabel untuk menampilkan nilai parameter */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4">Parameter</th>
                <th className="border-b-2 p-4">Nilai Aktor 1</th>
                <th className="border-b-2 p-4">Nilai Aktor 2</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border-b p-4">{row.parameter}</td>
                  <td className="border-b p-4">{row.nilaiAktor1}</td>
                  <td className="border-b p-4">{row.nilaiAktor2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
};

export default Drama;
