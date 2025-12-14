// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("driverToken");

  const navItemClass = (path) =>
    `px-4 py-2 rounded-md font-semibold ${
      location.pathname === path
        ? "bg-green-300 text-white"
        : "hover:bg-green-100 text-green-800"
    } transition`;

  return (
    <nav className="bg-white shadow-md py-1 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">Welcome to UV Express Van Monitoring!</div>
      <div className="flex items-center space-x-2">
        {(location.pathname === "/vans" || 
          location.pathname === "/reservation-form" || 
          location.pathname === "/driver-register" || 
          location.pathname === "/driver-login") && (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-md font-semibold hover:bg-green-100 text-green-800 transition"
          >
            Home
          </button>
        )}
        {(location.pathname === "/reservations" || location.pathname === "/driver-panel") && (
          <button
            onClick={() => navigate("/driver-panel")}
            className="px-4 py-2 rounded-md font-semibold hover:bg-green-100 text-green-800 transition"
          >
            Home
          </button>
        )}
        {(!token || location.pathname === "/" || location.pathname === "/vans" || location.pathname === "/reservation-form") && (
          <>
            <Link to="/driver-register" className={navItemClass("/driver-register")}>
              Register as Driver
            </Link>
            <Link to="/driver-login" className={navItemClass("/driver-login")}>
              Driver Login
            </Link>
          </>
        )}
        {token && location.pathname !== "/" && location.pathname !== "/reservation-form" && location.pathname !== "/vans" && (
          <button
            onClick={() => {
              localStorage.removeItem("driverToken");
              navigate("/driver-login");
            }}
            className={
              location.pathname === "/reservations" || location.pathname === "/driver-panel"
                ? "px-4 py-2 rounded-md font-semibold hover:bg-green-100 text-green-800 transition"
                : "ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            }
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
