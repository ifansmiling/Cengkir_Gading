import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import api from "../../../../services/api";

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
      alert("Rating berhasil dikirim!");
      navigate("/admin/drama");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/drama");
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Buat User Rating
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-bold font-dramatic-subtitle text-gray-700">
                Pilih Rating Parameter
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-green" // Tambahkan kelas range-green
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
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg mb-3"
              >
                Submit Rating
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 font-dramatic-body-user text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateRating;
