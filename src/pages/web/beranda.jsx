import React from "react";
import WebLayout from "../../layouts/BerandaLayout";

const Beranda = () => {
  return (
    <WebLayout>
      <div className="flex justify-center items-center min-h-screen bg-[#C9D7B8]">
        <div className="flex-1 flex justify-center">
          <img
            src="/path/to/logo.png"
            alt="Cengkir Gading Logo"
            className="w-64 h-auto"
          />
        </div>

        <div className="flex-1 max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-green-700 text-xl font-bold mb-4">
            Menjelajah Karakter, Menghidupkan Kisah
          </h2>
          <p className="text-gray-600 mb-4">
            Mengasah Kemampuan Akting, Menggali Potensi, dan Menghidupkan Setiap
            Karakter dengan Dedikasi Penuh di Atas Panggung.
          </p>
          <div className="flex space-x-4 mb-6">
            <button className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
              Login
            </button>
            <button className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
              Sign Up
            </button>
          </div>
          <p className="text-gray-700 text-sm">
            “Di Pusat Latihan Drama Cengkir Gading, setiap aktor tidak hanya
            belajar menghafal naskah, tetapi juga menguasai seni mendalam dalam
            menghidupkan karakter di atas panggung. Melalui bimbingan yang penuh
            dedikasi, kami menggali potensi tersembunyi dalam diri Anda,
            mengasah kemampuan akting, improvisasi, dan kolaborasi tim yang
            solid. Setiap sesi latihan dirancang untuk memupuk kepercayaan diri,
            memperkuat apresiasi terhadap seni, dan menyempurnakan keterampilan
            teknis seperti desain kostum dan panggung, penyutradaraan, hingga
            penulisan naskah. Kami percaya bahwa panggung adalah cermin dari
            kehidupan, dan bersama-sama”
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default Beranda;
