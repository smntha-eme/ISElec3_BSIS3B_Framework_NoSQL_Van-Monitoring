import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-50">
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-800">
            Welcome to UV Express Polangui-Legazpi
          </h1>
          <p className="text-green-700 mb-10 text-xl">
            Easily check van availability and reserve your seat in real-time.
          </p>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <button
              onClick={() => navigate("/vans")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            >
              Available Vans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
