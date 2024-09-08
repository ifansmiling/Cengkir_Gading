import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus, FaClipboardCheck } from "react-icons/fa";

const Karakter = () => {
  const [evaluasiKarakters, setEvaluasiKarakters] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvaluasiKarakters, setFilteredEvaluasiKarakters] = useState(
    []
  );
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchEvaluasiKarakters = async () => {
      try {
        const response = await api.get("/evaluasiKarakter");
        setEvaluasiKarakters(response.data);
        setFilteredEvaluasiKarakters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const usersWithRoleUser = response.data.filter(
          (user) => user.role === "User"
        );
        setUsers(usersWithRoleUser);
        setFilteredUsers(usersWithRoleUser);
      } catch (error) {
        console.error("Error fetching users:", error);  
      }
    };

    fetchEvaluasiKarakters();
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = evaluasiKarakters.filter((item) =>
        item.user?.nama.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEvaluasiKarakters(filtered);
    } else {
      setFilteredEvaluasiKarakters(evaluasiKarakters);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ target: { value: searchTerm } });
  };

  return (
    <AdminLayout>
      <div className="p-4">
        {/* Tabel Evaluasi Karakter */}
        <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto mb-6">
          Evaluasi Karakter
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center max-w-sm mx-auto mb-8"
        >
          <label htmlFor="user-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="user-search"
              className="bg-white border border-green-300 hover:border-green-700 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full pl-4 p-2.5 focus:outline-none"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-900 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center rounded-lg shadow-md mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Kekurangan</th>
                <th className="py-2 px-4 border">Evaluasi</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluasiKarakters.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-6 border">
                    {item.user?.nama || "Nama tidak ditemukan"}
                  </td>
                  <td className="py-2 px-3 border">{item.kekurangan}</td>
                  <td className="py-2 px-3 border">{item.evaluasi}</td>
                  <td className="py-2 px-6 border">
                    <div className="flex justify-center">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabel Pengguna dengan Role User */}
        <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto mb-4">
          Daftar Anggota
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">NIM</th>
                <th className="py-2 px-4 border">Catatan</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-6 border">{user.nama}</td>
                  <td className="py-2 px-6 border">{user.nim}</td>
                  <td className="py-2 px-6 border">
                    <span
                      className={
                        evaluasiKarakters.some(
                          (evaluasi) => evaluasi.user?.id === user.id
                        )
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {evaluasiKarakters.some(
                        (evaluasi) => evaluasi.user?.id === user.id
                      )
                        ? "Sudah dievaluasi"
                        : "Belum dievaluasi"}
                    </span>
                  </td>
                  <td className="py-2 px-6 border">
                    <button className="text-blue-500 hover:text-blue-800">
                      <FaClipboardCheck />
                    </button>
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

export default Karakter;
