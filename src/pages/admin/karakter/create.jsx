import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import "../../../index.css";
import { useNavigate } from "react-router-dom";

const AddEvaluasi = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [judulEvaluasi, setJudulEvaluasi] = useState("");
  const [evaluasi, setEvaluasi] = useState("");
  const [kekurangan, setKekurangan] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/evaluasiKarakter", {
        judul_evaluasi: judulEvaluasi,
        evaluasi: evaluasi,
        kekurangan: kekurangan,
        user_id: userId,
      });
      navigate("/admin/karakter");
    } catch (error) {
      console.error("Error creating evaluasi:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/karakter");
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Evaluasi Karakter Anggota
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="judul-evaluasi"
              >
                Judul Evaluasi
              </label>
              <input
                type="text"
                id="judul-evaluasi"
                value={judulEvaluasi}
                onChange={(e) => setJudulEvaluasi(e.target.value)}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Masukkan Judul Evaluasi"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="evaluasi"
              >
                Evaluasi
              </label>
              <textarea
                id="evaluasi"
                value={evaluasi}
                onChange={(e) => setEvaluasi(e.target.value)}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Masukkan Evaluasi"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="kekurangan"
              >
                Kekurangan
              </label>
              <textarea
                id="kekurangan"
                value={kekurangan}
                onChange={(e) => setKekurangan(e.target.value)}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Masukkan Kekurangan"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 mb-3 font-dramatic-body-user text-lg"
            >
              Simpan Evaluasi
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 font-dramatic-body-user text-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEvaluasi;