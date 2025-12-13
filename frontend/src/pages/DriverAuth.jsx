import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DriverAuth() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); // login or register

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    licenseId: "",
    plateNumber: "",
    address: "",
    age: "",
    birthday: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("http://localhost:3000/drivers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed");
      } else {
        // save token to localStorage
        localStorage.setItem("driverToken", data.token);
        localStorage.setItem("driverId", data.driver._id);
        navigate(`/driver-panel/${data.driver._id}`);
      }
    } catch (err) {
      setLoginError("Server error");
      console.error(err);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const res = await fetch("http://localhost:3000/drivers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();

      if (!res.ok) {
        setRegisterError(data.error || "Registration failed");
      } else {
        setRegisterSuccess("Registered successfully! You can now log in.");
        setRegisterData({
          name: "",
          licenseId: "",
          plateNumber: "",
          address: "",
          age: "",
          birthday: "",
          email: "",
          password: "",
          profilePic: "",
        });
        setTab("login");
      }
    } catch (err) {
      setRegisterError("Server error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-6">
          <button
            onClick={() => setTab("login")}
            className={`px-4 py-2 rounded-2xl font-semibold ${
              tab === "login"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-4 py-2 rounded-2xl font-semibold ${
              tab === "register"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Log In
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-3">
            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}
            {registerSuccess && (
              <p className="text-green-500 text-sm">{registerSuccess}</p>
            )}
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="License ID"
              value={registerData.licenseId}
              onChange={(e) =>
                setRegisterData({ ...registerData, licenseId: e.target.value })
              }
              required
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Plate Number"
              value={registerData.plateNumber}
              onChange={(e) =>
                setRegisterData({ ...registerData, plateNumber: e.target.value })
              }
              required
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={registerData.address}
              onChange={(e) =>
                setRegisterData({ ...registerData, address: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Age"
              value={registerData.age}
              onChange={(e) =>
                setRegisterData({ ...registerData, age: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              placeholder="Birthday"
              value={registerData.birthday}
              onChange={(e) =>
                setRegisterData({ ...registerData, birthday: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Profile Picture URL"
              value={registerData.profilePic}
              onChange={(e) =>
                setRegisterData({ ...registerData, profilePic: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
