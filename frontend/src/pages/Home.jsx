import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-50">
      <div className="flex items-center justify-center p-20">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-green-800">
            Welcome to UV Express Polangui-Legazpi
          </h2>
          <p className="text-green-700 mb-8 text-lg">
            Easily check van availability and reserve your seat in real-time.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/reservation-form")}
              className="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Reserve Seat Now
            </button>

            <button
              onClick={() => navigate("/reservations")}
              className="bg-green-200 hover:bg-green-300 text-green-800 font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              View Reserved Seats
            </button>

            <button
              onClick={() => navigate("/driver-login")}
              className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Log In as Driver
            </button>

            <button
              onClick={() => navigate("/driver-register")}
              className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Register as Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
