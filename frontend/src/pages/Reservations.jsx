import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
import API_URL from "../config";
>>>>>>> fbf7806a30184e321de93c4135c087b563dc5c7a

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reservations");
      setReservations(res.data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load reservations. Make sure your backend is running!");
      setLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    fetchReservations();
=======
    fetch(`${API_URL}/reservations`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setLoading(false);
      });
>>>>>>> fbf7806a30184e321de93c4135c087b563dc5c7a
  }, []);

  const statusColors = {
    Waiting: "bg-yellow-200 text-green-900",
    Traveling: "bg-blue-200 text-green-900",
    Arrived: "bg-green-200 text-green-900",
    Parked: "bg-gray-200 text-green-900",
  };

  const filteredReservations = reservations.filter((res) => {
    const searchLower = search.toLowerCase();
    return (
      (res.passengerName.toLowerCase().includes(searchLower) ||
       res.van.route.toLowerCase().includes(searchLower) ||
       res.van.plateNumber.toLowerCase().includes(searchLower)) &&
      (statusFilter === "" || res.van.status === statusFilter)
    );
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-green-700">Loading reservations...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 p-6">
      <h1 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
        Reservations
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by passenger, route, or plate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-green-300 bg-white text-green-900 placeholder-green-400 focus:ring-2 focus:ring-green-400 outline-none transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded-xl border border-green-300 bg-white text-green-900 focus:ring-2 focus:ring-green-400 outline-none transition"
        >
          <option value="">All Statuses</option>
          <option value="Waiting">Waiting</option>
          <option value="Traveling">Traveling</option>
          <option value="Arrived">Arrived</option>
          <option value="Parked">Parked</option>
        </select>
      </div>

      {/* Reservations Table */}
      {filteredReservations.length === 0 ? (
        <p className="text-center text-green-700 font-semibold mt-10">
          No reservations found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
            <thead className="bg-green-100">
              <tr>
                <th className="p-4 text-left font-semibold text-green-900">Passenger</th>
                <th className="p-4 text-left font-semibold text-green-900">Van Route</th>
                <th className="p-4 text-left font-semibold text-green-900">Plate Number</th>
                <th className="p-4 text-left font-semibold text-green-900">Seats</th>
                <th className="p-4 text-left font-semibold text-green-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res._id} className="border-b hover:bg-green-50 transition">
                  <td className="p-4 text-gray-800">{res.passengerName}</td>
                  <td className="p-4 text-gray-800">{res.van.route}</td>
                  <td className="p-4 text-gray-800">{res.van.plateNumber}</td>
                  <td className="p-4 text-gray-800">{res.quantity}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[res.van.status] || "bg-gray-200 text-green-900"
                      }`}
                    >
                      {res.van.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
