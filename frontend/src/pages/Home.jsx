import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
          Welcome to UV Express Polangui-Legazpi
        </h2>
        <p className="text-gray-700 mb-4 text-lg">
          Easily check van availability and reserve your seat in real-time.
        </p>

        {/* Driver Login/Register link */}
        <p className="mb-8 text-green-700 font-semibold">
          <Link
            to="/driver-auth"
            className="underline hover:text-green-900 transition duration-300"
          >
            Log In or Register if you are a driver
          </Link>
        </p>

        <div className="space-x-4">
          {/* Reserve Seat → goes to Reservation Form */}
          <Link
            to="/reservation-form"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 inline-block"
          >
            Reserve Seat Now
          </Link>

          {/* View Reserved Seats → goes to /reservations */}
          <Link
            to="/reservations"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 inline-block"
          >
            View Reserved Seats
          </Link>
        </div>
      </div>
    </div>
  );
}
