import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";

const CreateRating = () => {
  const { id: userId } = useParams();
  const [parameters, setParameters] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await api.get("/drama");
        setParameters(response.data);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      }
    };
    fetchParameters();
  }, []);

  const handleRatingChange = (paramId, rating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [paramId]: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: userId,
        parameter_id: Object.keys(selectedRatings),
        rating: Object.values(selectedRatings).map((r) => Number(r)), 
      };
      await api.post("/user-rating", data);
      navigate("/admin/drama");
      alert("Rating berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Buat User Rating</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pilih Rating per Parameter
            </label>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map((param) => (
                <div key={param.id} className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-gray-700">
                    {param.nama}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={selectedRatings[param.id] || 50}
                    onChange={(e) =>
                      handleRatingChange(param.id, e.target.value)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {selectedRatings[param.id] || 50} / 100
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateRating;
