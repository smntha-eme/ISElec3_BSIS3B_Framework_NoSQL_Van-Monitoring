// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItemClass = (path) =>
    `px-4 py-2 rounded-md font-semibold ${
      location.pathname === path
        ? "bg-green-300 text-white"
        : "hover:bg-green-100 text-green-800"
    } transition`;

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">Welcome to UV Express Van Monitoring!</div>
      <div className="flex space-x-2">
        <Link to="/available-vans" className={navItemClass("/available-vans")}>
          Available Vans
        </Link>
        <Link to="/reservations" className={navItemClass("/reservations")}>
          View Reservations
        </Link>
      </div>
    </nav>
  );
}
