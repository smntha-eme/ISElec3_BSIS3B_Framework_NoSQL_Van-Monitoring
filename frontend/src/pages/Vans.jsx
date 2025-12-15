import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const fetchVans = async () => {
    try {
      const res = await fetch(`${API_URL}/vans`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVans(data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.error("Error fetching vans:", err);
      setError("Failed to load vans. Make sure your backend is running!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVans();
    const interval = setInterval(fetchVans, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredVans = vans.filter((van) => {
    const searchLower = search.toLowerCase();
    return (
      (van.route.toLowerCase().includes(searchLower) ||
        van.driverName.toLowerCase().includes(searchLower) ||
        van.plateNumber.toLowerCase().includes(searchLower)) &&
      (statusFilter === "" || van.status === statusFilter)
    );
  });

  if (loading)
    return (
      <div className="p-8 text-center text-green-700 text-xl font-semibold">
        Wait a minute...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500 text-xl font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-8 md:p-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-900 mb-10">
        Available Vans
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
        <input
          type="text"
          placeholder="Search by route, driver, or plate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-4 rounded-2xl border border-green-300 bg-white text-green-900 placeholder-green-400 focus:ring-4 focus:ring-green-300 outline-none transition shadow-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/3 p-4 rounded-2xl border border-green-300 bg-white text-green-900 focus:ring-4 focus:ring-green-300 outline-none transition shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="Waiting">Waiting</option>
          <option value="Traveling">Traveling</option>
          <option value="Arrived">Arrived</option>
          <option value="Parked">Parked</option>
        </select>
      </div>

      {/* Vans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVans.length === 0 ? (
          <p className="text-center text-green-700 col-span-full text-lg">
            No vans found.
          </p>
        ) : (
          filteredVans.map((van) => {
            const canReserve = van.availableSeats > 0 && van.status === "Waiting";

            return (
              <div
                key={van._id}
                className="bg-white rounded-3xl p-6 border border-green-100 shadow-md hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-green-900">{van.route}</h2>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold 
                      ${
                        van.status === "Waiting"
                          ? "bg-yellow-200 text-green-900"
                          : van.status === "Traveling"
                          ? "bg-blue-200 text-green-900"
                          : van.status === "Arrived"
                          ? "bg-green-200 text-green-900"
                          : "bg-gray-200 text-green-900"
                      }`}
                  >
                    {van.status}
                  </span>
                </div>

                <div className="text-green-900 space-y-2 mb-6">
                  <p>
                    <span className="font-semibold">Driver:</span> {van.driverName}
                  </p>
                  <p>
                    <span className="font-semibold">Plate:</span> {van.plateNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Seats:</span> {van.availableSeats}/{van.totalSeats} available
                  </p>
                </div>

                <button
                  onClick={() => canReserve && navigate(`/reservation-form?vanId=${van._id}`)}
                  disabled={!canReserve}
                  className={`w-full text-center font-semibold py-3 rounded-2xl shadow-md transition duration-300
                    ${canReserve
                      ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {canReserve ? "Reserve Seat" : "Unavailable"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
