import React, { useEffect, useState, useContext } from "react";
import { VanContext } from "../context/vanContext";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config";

export default function ReservationForm() {
  const { vans, fetchVans } = useContext(VanContext);
  const [passengerName, setPassengerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVan, setSelectedVan] = useState(null);
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedVanId = params.get("vanId");
    if (selectedVanId) {
      const van = vans.find(v => v._id === selectedVanId);
      setSelectedVan(van);
    }
  }, [location, vans]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passengerName || !selectedVan) {
      alert("Please enter your name and ensure a van is selected");
      return;
    }
    if (quantity < 1 || quantity > selectedVan.availableSeats) {
      alert(`Please select between 1 and ${selectedVan.availableSeats} seats`);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passengerName, vanId: selectedVan._id, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Reservation failed");
        return;
      }
      fetchVans();
      navigate("/ticket", {
        state: {
          ticket: {
            passengerName,
            quantity,
            van: {
              plateNumber: selectedVan.plateNumber,
              route: selectedVan.route,
              driverName: selectedVan.driverName,
            },
          },
        },
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while reserving. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-12 max-w-lg w-full hover:shadow-3xl transition duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-green-900">
          Reserve a Seat
        </h1>

        {!selectedVan ? (
          <p className="text-green-700 text-center font-semibold">
            Please select a van from the Available Vans page.
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
                required
                className="w-full p-4 border border-green-300 rounded-2xl focus:ring-4 focus:ring-green-400 outline-none transition duration-300 text-black"
              />
            </div>

            <div className="bg-green-50 p-5 rounded-2xl border border-green-200 shadow-sm">
              <h3 className="font-semibold text-green-900 mb-3">Selected Van</h3>
              <div className="space-y-1 text-black">
                <p><span className="font-semibold">Route:</span> {selectedVan.route}</p>
                <p><span className="font-semibold">Driver:</span> {selectedVan.driverName}</p>
                <p><span className="font-semibold">Van Number:</span> {selectedVan.plateNumber}</p>
                <p><span className="font-semibold">Available Seats:</span> {selectedVan.availableSeats}</p>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-green-900">
                Number of Seats to Reserve:
              </label>
              <input
                type="number"
                min="1"
                max={selectedVan.availableSeats}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
                className="w-full p-4 border border-green-300 rounded-2xl focus:ring-4 focus:ring-green-400 outline-none transition duration-300 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition transform hover:scale-105 duration-300"
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
