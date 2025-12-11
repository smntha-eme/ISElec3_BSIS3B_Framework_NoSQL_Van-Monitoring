import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState(null);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/vans") // get available vans
      .then((res) => res.json())
      .then((data) => setVans(data))
      .catch((err) => console.error(err));
  }, []);

  const handleReservation = () => {
    if (!selectedVan || !name) return alert("Select a van and enter your name");

    fetch(`http://localhost:3000/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vanId: selectedVan, passengerName: name }),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccess(`Seat reserved successfully for ${name} on Van ${selectedVan}`);
        setName("");
        setSelectedVan(null);

        // remove success message after 5s
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-6 text-center">
          Reserve a Seat
        </h2>

        {vans.length === 0 ? (
          <p className="text-center text-gray-500">No vans available for reservation</p>
        ) : (
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block font-semibold mb-2 text-green-800">Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition duration-300"
              />
            </div>

            {/* Van Selector */}
            <div>
              <label className="block font-semibold mb-2 text-green-800">Select Van:</label>
              <select
                value={selectedVan || ""}
                onChange={(e) => setSelectedVan(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition duration-300"
              >
                <option value="" disabled>
                  -- Choose a van --
                </option>
                {vans.map((van) => (
                  <option key={van.id} value={van.id}>
                    Van {van.id} ({van.route}) - {van.availableSeats} seats
                  </option>
                ))}
              </select>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleReservation}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
            >
              Reserve
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-700 font-semibold text-center mt-4 animate-fade-in">
                {success}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
