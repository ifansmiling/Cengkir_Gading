import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";

const EvaluasiKarakter = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("id");

  const fetchEvaluationByUserId = async (userId) => {
    try {
      const response = await api.get(`/evaluasiKarakter/user/${userId}`);
      if (response.data.message) {
        setMessage(response.data.message);
        setEvaluation([]);
      } else {
        setEvaluation(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEvaluationByUserId(userId);
    }
  }, [userId]);

  if (loading)
    return (
      <UserLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-green-700 font-semibold text-lg">Loading...</div>
        </div>
      </UserLayout>
    );
  if (error)
    return (
      <UserLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 font-semibold text-lg">Error: {error}</p>
        </div>
      </UserLayout>
    );

  return (
    <UserLayout>
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-10">
            <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
              Evaluasi Karakter Anggota
            </h1>
          </div>

          {message && (
            <div className="bg-red-100 text-red-500 p-4 text-center mb-6 rounded-lg shadow-lg">
              {message}
            </div>
          )}

          {evaluation && evaluation.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {evaluation.map((evalItem) => (
                <div
                  key={evalItem.id}
                  className="relative group bg-white shadow-lg rounded-xl p-8 hover:shadow-xl hover:bg-gradient-to-r from-green-100 to-blue-200 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                >
                  <h2 className="font-dramatic-body-user text-xl font-extrabold text-green-700 mb-6 text-center">
                    {evalItem.judul_evaluasi}
                  </h2>

                  <div className="mb-6">
                    <h3 className="font-dramatic-body-user text-base font-semibold text-green-800 mb-3">
                      Kekurangan
                    </h3>
                    <div className="space-y-2 text-justify text-gray-600 font-dramatic-body-user text-sm">
                      {evalItem.kekurangan
                        ?.split("\n")
                        .map((weakness, index) => (
                          <p key={index} className="text-gray-700">
                            {weakness}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-dramatic-body-user text-base font-semibold text-green-800 mb-3">
                      Evaluasi yang Harus Dilakukan
                    </h3>
                    <div className="space-y-2 text-justify text-gray-600 font-dramatic-body-user text-sm">
                      {evalItem.evaluasi
                        ?.split("\n")
                        .map((improvement, index) => (
                          <p key={index} className="text-gray-700">
                            {improvement}
                          </p>
                        ))}
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute inset-0 h-1 w-full bg-gradient-to-r from-green-400 to-green-700 rounded-lg group-hover:h-3 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700">
              Tidak ada evaluasi yang tersedia.
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default EvaluasiKarakter;
