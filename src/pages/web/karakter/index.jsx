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
        <p>Loading...</p>
      </UserLayout>
    );
  if (error)
    return (
      <UserLayout>
        <p>Error: {error}</p>
      </UserLayout>
    );

  return (
    <UserLayout>
      <div className="bg-white min-h-screen py-8">
        <div className="max-w-full mx-auto px-4">
          {" "}
          <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-8 underline underline-offset-2 decoration-green-800">
            Evaluasi Karakter Anggota
          </h1>
          {message && (
            <div className="bg-white p-4 text-red-500 text-center mb-4 rounded-md shadow-md">
              {message}
            </div>
          )}
          {evaluation && evaluation.length > 0 ? (
            <div className="grid grid-cols-1  gap-8 max-w-6xl items-center mx-auto">
              {evaluation.map((evalItem) => (
                <div
                  key={evalItem.id}
                  className="bg-white shadow-lg p-6 rounded-xl hover:bg-green-50 transition-all duration-300 max-w-full"
                >
                  <h2 className="font-dramatic-body-user text-2xl font-bold text-green-700 mb-6 border-b border-green-300 pb-3 text-center">
                    {evalItem.judul_evaluasi}
                  </h2>

                  <div className="mb-6">
                    <h3 className="font-dramatic-body-user text-lg font-semibold text-green-800 mb-2">
                      Kekurangan:
                    </h3>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-justify text-gray-700">
                      {evalItem.kekurangan
                        ?.split("\n")
                        .map((weakness, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-dramatic-subtitle text-base"
                          >
                            {weakness}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-dramatic-body-user text-lg font-semibold text-green-800 mb-2">
                      Evaluasi yang Harus Dilakukan:
                    </h3>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-justify text-gray-700">
                      {evalItem.evaluasi
                        ?.split("\n")
                        .map((improvement, index) => (
                          <li
                            key={index}
                            className="text-gray-600 font-dramatic-subtitle text-base"
                          >
                            {improvement}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700"></p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default EvaluasiKarakter;
