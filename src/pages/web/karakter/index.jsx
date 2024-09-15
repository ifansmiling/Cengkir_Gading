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
      <div className="bg-white min-h-screen py-8 relative">
        <div className="max-w-5xl mx-auto px-4 bg-white  mt-4">
          <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
            Evaluasi Karakter Drama
          </h1>

          {message && (
            <div className="bg-yellow-100 p-4 text-yellow-700 text-center mb-4">
              {message}
            </div>
          )}

          {evaluation && evaluation.length > 0 ? (
            evaluation.map((evalItem) => (
              <div key={evalItem.id} className="bg-gray-50 shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {evalItem.judul_evaluasi}
                </h2>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-700">
                    Kekurangan:
                  </h3>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    {evalItem.kekurangan?.split("\n").map((weakness, index) => (
                      <li key={index} className="text-gray-600">
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-700">
                    Evaluasi yang Harus Dilakukan:
                  </h3>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    {evalItem.evaluasi
                      ?.split("\n")
                      .map((improvement, index) => (
                        <li key={index} className="text-gray-600">
                          {improvement}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700"></p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default EvaluasiKarakter;
