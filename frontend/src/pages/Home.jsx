import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../pages/logovan.png"; // replace with your logo path

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-50 px-6">
      {/* Floating logo container */}
      <div className="mb-10 relative">
        <div className="bg-white/80 rounded-full p-4 shadow-xl animate-bounce-slow">
          <img
            src={logo}
            alt="UV Express Logo"
            className="h-24 w-24 md:h-32 md:w-32 object-cover"
          />
        </div>
      </div>

      {/* White card centered below logo */}
      <div className="bg-white/90 rounded-2xl shadow-2xl px-10 py-12 max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight">
          Welcome to UV Express Polangui–Legazpi
        </h1>

        <p className="text-green-700 text-lg md:text-xl mb-10">
          Easily check van availability and reserve your seat in real-time.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/vans")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            Available Vans
          </button>
        </div>
      </div>
    </div>
  );
}