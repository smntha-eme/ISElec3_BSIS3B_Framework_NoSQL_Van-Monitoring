import React, { useEffect, useState } from "react";

const Vans = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/vans") // backend route
      .then((res) => res.json())
      .then((data) => {
        setVans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vans:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-center text-green-700">Loading vans...</p>;

  return (
    <div className="min-h-screen bg-green-50 p-8 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
          Available Vans
        </h2>

        {vans.length === 0 ? (
          <p className="text-center text-green-700">No vans available at the moment</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">Van ID</th>
                  <th className="p-3 text-left">Route</th>
                  <th className="p-3 text-left">Seats Available</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {vans.map((van, idx) => (
                  <tr
                    key={van.id}
                    className={`text-center transition hover:bg-green-100 ${
                      idx % 2 === 0 ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3 border">{van.id}</td>
                    <td className="p-3 border">{van.route}</td>
                    <td className="p-3 border">{van.availableSeats}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          van.status === "available"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {van.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vans;
