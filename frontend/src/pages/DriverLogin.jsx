import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

export default function DriverLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:3000/drivers/login", { email, password });
=======
      const res = await axios.post(
        `${API_URL}/drivers/login`,
        { email, password }
      );

>>>>>>> fbf7806a30184e321de93c4135c087b563dc5c7a
      localStorage.setItem("driverToken", res.data.token);
      navigate("/driver-panel");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full hover:shadow-3xl transition duration-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl font-bold">
            🚐
          </div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-1">Driver Login</h2>
          <p className="text-sm text-green-700">Access your driver dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-green-900 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="driver@email.com"
            className="w-full p-3 rounded-2xl border border-green-300 text-black focus:ring-2 focus:ring-green-400 outline-none transition duration-300"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-green-900 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-3 pr-10 rounded-2xl border border-green-300 text-black focus:ring-2 focus:ring-green-400 outline-none transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-green-600 font-semibold text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-semibold text-white shadow-lg transition transform hover:scale-105 duration-300
            ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-green-700 mt-6">Authorized drivers only</p>
      </form>
    </div>
  );
}
