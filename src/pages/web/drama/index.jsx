import React from "react";
import UserLayout from "../../../layouts/UserLayout";

const Index = () => {
  return (
    <UserLayout>
      {/* Main Content */}
      <div className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Perpustakaan Drama - Laporan Kinerja dan Statistik
        </h1>
        <p className="text-gray-700 mb-4">
          Fitur ini melacak kemajuan individu dalam latihan. Admin akan
          menginputkan parameter pengelompokan untuk mengelompokkan para aktor
          berdasarkan berbagai parameter seperti kemampuan akting, pengelolaan
          jiwa, jiwa apresiasi terhadap seni, improvisasi, kolaborasi tim,
          kepercayaan diri, desain kostum dan panggung, penyutradaraan,
          penulisan naskah, penguasaan panggung, pengembangan karakter.
        </p>
        <p className="text-gray-700 mb-4">
          Setiap parameter akan dinilai dari 1-100 dan diinputkan lalu web akan
          mengolah seluruh parameter menggunakan metode SCRUM dan memberikan
          output nilai akhir berupa angka, mirip seperti rating pemain sepak
          bola saat selesai tanding.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold text-gray-800">
            Contoh Rating:
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Kemampuan Akting: 85</li>
            <li>Pengelolaan Jiwa: 90</li>
            <li>Improvisasi: 80</li>
            <li>Kolaborasi Tim: 75</li>
            <li>Pengembangan Karakter: 88</li>
            {/* Add more parameters as needed */}
          </ul>
          <p className="mt-2 text-gray-700">
            Nilai Akhir: 83.5 (dihitung menggunakan metode SCRUM)
          </p>
        </div>
      </div>
      <div className="p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Perpustakaan Drama - Laporan Kinerja dan Statistik
        </h1>
        <p className="text-gray-700 mb-4">
          Fitur ini melacak kemajuan individu dalam latihan. Admin akan
          menginputkan parameter pengelompokan untuk mengelompokkan para aktor
          berdasarkan berbagai parameter seperti kemampuan akting, pengelolaan
          jiwa, jiwa apresiasi terhadap seni, improvisasi, kolaborasi tim,
          kepercayaan diri, desain kostum dan panggung, penyutradaraan,
          penulisan naskah, penguasaan panggung, pengembangan karakter.
        </p>
        <p className="text-gray-700 mb-4">
          Setiap parameter akan dinilai dari 1-100 dan diinputkan lalu web akan
          mengolah seluruh parameter menggunakan metode SCRUM dan memberikan
          output nilai akhir berupa angka, mirip seperti rating pemain sepak
          bola saat selesai tanding.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold text-gray-800">
            Contoh Rating:
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Kemampuan Akting: 85</li>
            <li>Pengelolaan Jiwa: 90</li>
            <li>Improvisasi: 80</li>
            <li>Kolaborasi Tim: 75</li>
            <li>Pengembangan Karakter: 88</li>
            {/* Add more parameters as needed */}
          </ul>
          <p className="mt-2 text-gray-700">
            Nilai Akhir: 83.5 (dihitung menggunakan metode SCRUM)
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Index;
