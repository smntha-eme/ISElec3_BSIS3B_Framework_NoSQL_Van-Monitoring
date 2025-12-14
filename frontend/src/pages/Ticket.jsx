import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <p className="text-red-600 font-semibold mb-4">No ticket data available</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-900">
          Reservation Ticket
        </h1>

        <div className="space-y-4 mb-8">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Passenger Name</p>
            <p className="text-lg font-semibold text-green-900">{ticket.passengerName}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Number of Seats Reserved</p>
            <p className="text-lg font-semibold text-green-900">{ticket.quantity}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Van Number</p>
            <p className="text-lg font-semibold text-green-900">{ticket.van.plateNumber}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Route</p>
            <p className="text-lg font-semibold text-green-900">{ticket.van.route}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-600">Driver Name</p>
            <p className="text-lg font-semibold text-green-900">{ticket.van.driverName}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
