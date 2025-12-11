import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
          Welcome to UV Express Polangui-Legazpi
        </h2>
        <p className="text-gray-700 mb-8 text-lg">
          Easily check van availability and reserve your seat in real-time.
        </p>
        <Link
          to="/reservations"  // links to your Reservations page
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 inline-block"
        >
          Reserve Seat Now
        </Link>
      </div>
    </div>
  );
}
