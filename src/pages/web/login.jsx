import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebLayout from "../../layouts/BerandaLayout";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        kataSandi: password,
      });

      const { token, role } = response.data;

      localStorage.setItem("token", token);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/drama");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login gagal. Coba lagi."
      );
    }
  };

  return (
    <WebLayout>
      <div className="flex justify-center items-start min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center mt-10 ml-4">
          <img
            src="/logo2.png"
            alt="Cengkir Gading Logo"
            className="w-60 h-auto mb-4"
          />
          <p className="text-center px-4 text-gray-900 text-sm mb-8">
            Bergabunglah dengan Cengkir Gading, dan Jadilah Bagian dari
            Komunitas Kreatif yang Menghidupkan Seni Peran di Panggung!
          </p>
        </div>

        <div className="flex-1 max-w-md p-8 mt-16 mr-36">
          <h2 className="text-green-700 text-xl font-bold mb-4 border-b border-gray-300 inline-block pb-0.5">
            Masuk ke Akun Kamu
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Masukkan email kamu"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Kata Sandi<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Masukkan kata sandi kamu"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-700 text-sm mt-6">
            Belum Mempunyai Akun?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Buat Akun
            </a>
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default Login;
