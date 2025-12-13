import React, { useEffect, useState, useContext } from "react";
import { VanContext } from "../context/vanContext";
import { useLocation } from "react-router-dom";

export default function ReservationForm() {
  const { vans, fetchVans } = useContext(VanContext);
  const [passengerName, setPassengerName] = useState("");
  const [vanId, setVanId] = useState("");
  const [success, setSuccess] = useState("");

  // Get vanId from query params if user clicked "Reserve Seat" from Vans page
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedVanId = params.get("vanId");
    if (selectedVanId) setVanId(selectedVanId);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passengerName || !vanId) {
      alert("Please enter your name and select a van");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passengerName, vanId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Reservation failed");
        return;
      }

      setSuccess(`Reservation successful for ${passengerName}`);
      setPassengerName("");
      setVanId(""); // reset van select only if you want

      fetchVans(); // refresh available seats

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error(err);
      alert("An error occurred while reserving. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-900">
          Reserve a Seat
        </h1>

        {vans.length === 0 ? (
          <p className="text-green-700 text-center font-semibold">
            No vans available at the moment.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-green-900">
                Your Name:
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition duration-300 text-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-green-900">
                Select Van:
              </label>
              <select
                value={vanId}
                onChange={(e) => setVanId(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition duration-300 text-black"
              >
                <option value="">-- Choose a van --</option>
                {vans.map((v) => (
                  <option
                    key={v._id}
                    value={v._id}
                    disabled={v.status !== "Waiting" || v.availableSeats === 0}
                  >
                    {v.route} — {v.driverName} | Seats Left: {v.availableSeats}{" "}
                    {v.status !== "Waiting" || v.availableSeats === 0 ? "(Unavailable)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
            >
              Reserve
            </button>

            {success && (
              <p className="text-green-700 font-semibold text-center mt-4 animate-fade-in">
                {success}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
