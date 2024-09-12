import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import api from "../../../../services/api";

const EditRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratingMap, setRatingMap] = useState({});

  const fetchUserRating = async () => {
    try {
      const response = await api.get("/user-rating/rating", {
        params: { ids: id },
      });
      const data = response.data.data;
      setUserRating(data);
      const ratings = data.reduce((acc, item) => {
        acc[item.parameter_id] = item.rating;
        return acc;
      }, {});
      setRatingMap(ratings);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRating();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = userRating.map((ratingData) => ({
        parameter_id: ratingData.parameter_id,
        rating: ratingMap[ratingData.parameter_id] || ratingData.rating,
      }));

      await api.put("/user-rating/update/rating", {
        user_id: id,
        parameter_id: updates.map((update) => update.parameter_id),
        rating: updates.map((update) => update.rating),
      });

      alert("Rating berhasil diperbarui!");
      navigate("/admin/drama");
    } catch (err) {
      console.error("Error updating rating:", err);
      alert("Gagal memperbarui rating");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Edit User Rating</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          {userRating.map((ratingData) => (
            <div
              key={ratingData.parameter_id}
              className="flex flex-col items-start"
            >
              <label
                htmlFor={`rating-${ratingData.parameter_id}`}
                className="block text-sm font-medium text-gray-700"
              >
                {ratingData.drama.nama}:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id={`rating-${ratingData.parameter_id}`}
                  type="range"
                  min="1"
                  max="100"
                  value={ratingMap[ratingData.parameter_id] || ""}
                  onChange={(e) =>
                    setRatingMap((prevRatings) => ({
                      ...prevRatings,
                      [ratingData.parameter_id]: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span className="text-sm font-medium text-gray-700">
                  {ratingMap[ratingData.parameter_id] || "0"}
                </span>
              </div>
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditRating;
