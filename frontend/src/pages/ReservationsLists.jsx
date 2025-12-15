import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverLoaded, setDriverLoaded] = useState(false);
  const [driverVanId, setDriverVanId] = useState(null);

  const token = localStorage.getItem("driverToken");

  useEffect(() => {
    const fetchDriverAndReservations = async () => {
      setLoading(true);
      
      try {
        let vanId = null;
        
        // If driver is logged in, fetch driver details first
        if (token) {
          const driverRes = await axios.get(`${API_URL}/drivers/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          vanId = driverRes.data.van?._id;
          setDriverVanId(vanId);
        }
        
        setDriverLoaded(true);

        // Now fetch reservations
        const res = await fetch(`${API_URL}/reservations`);
        const data = await res.json();
        
        // Filter reservations by driver's van if logged in
        if (token && vanId) {
          const filteredData = data.filter(
            (resv) => resv.van?._id === vanId
          );
          setReservations(filteredData);
        } else {
          setReservations(data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchDriverAndReservations();
    const interval = setInterval(fetchDriverAndReservations, 5000); // live refresh every 5s
    return () => clearInterval(interval);
  }, [token]);

  if (loading || !driverLoaded)
    return (
      <p className="p-6 text-center text-green-700 font-semibold">
        Loading reservations...
      </p>
    );

  return (
    <div className="min-h-screen bg-green-50 p-8 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center">
          Reserved Seats
        </h2>

        {reservations.length === 0 ? (
          <p className="text-center text-green-700 font-semibold">
            No reservations yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-green-400 to-green-500 text-white">
                <tr>
                  <th className="p-3 text-left">Passenger Name</th>
                  <th className="p-3 text-left">Van Route</th>
                  <th className="p-3 text-center">Seats Reserved</th>
                  <th className="p-3 text-center">Van Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((resv) => (
                  <tr
                    key={resv._id}
                    className="text-black text-center hover:bg-green-100 transition"
                  >
                    <td className="p-3 border text-left">{resv.passengerName}</td>
                    <td className="p-3 border text-left">{resv.van?.route || "N/A"}</td>
                    <td className="p-3 border text-center">{resv.quantity || 1}</td>
                    <td className="p-3 border text-center">{resv.van?.status ? (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            resv.van.status === "Waiting"
                              ? "bg-yellow-300 text-black"
                              : resv.van.status === "Traveling"
                              ? "bg-blue-300 text-black"
                              : resv.van.status === "Arrived"
                              ? "bg-green-300 text-black"
                              : "bg-gray-300 text-black"
                          }`}
                        >
                          {resv.van.status}
                        </span>
                      ) : (
                        "N/A"
                      )}
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

export default ReservationsList;
