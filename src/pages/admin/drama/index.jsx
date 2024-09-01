import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FaStar, FaRegStar } from "react-icons/fa";
import api from "../../../services/api";

const Drama = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Set all users
        setUsers(response.data);

        // Filter users with role 'user'
        const usersWithRoleUser = response.data.filter(
          (user) => user.role === "user"
        );
        setFilteredUsers(usersWithRoleUser);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-center">No</th>
                <th className="py-2 px-4 border-b text-center">Nama</th>
                <th className="py-2 px-4 border-b text-center">NIM</th>
                <th className="py-2 px-4 border-b text-center">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.nama}</td>
                  <td className="py-2 px-4 border-b">{user.nim}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center items-center h-full">
                      {user.nilai >= 75 ? (
                        <FaStar className="text-yellow-500 text-xl" />
                      ) : (
                        <FaRegStar className="text-gray-500 text-xl" />
                      )}
                      <span className="ml-2">{user.nilai}</span>{" "}
                      {/* Display the actual score */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Drama;
