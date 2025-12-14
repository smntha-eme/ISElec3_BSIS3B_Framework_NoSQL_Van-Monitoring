import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DriverPanel() {
  const [driver, setDriver] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("driverToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3000/drivers/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDriver(res.data);
        setStatus(res.data.van?.status || "Waiting");
        setAvailableSeats(res.data.van?.availableSeats || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const updateStatus = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/drivers/${driver._id}/van-status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Van status updated successfully");
      setDriver({ ...driver, van: res.data.van });
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const updateAvailableSeats = async (newSeats) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/drivers/${driver._id}/van-seats`,
        { availableSeats: newSeats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Available seats updated successfully");
      setDriver({ ...driver, van: res.data.van });
      setAvailableSeats(newSeats);
    } catch (err) {
      console.error(err);
      alert("Failed to update available seats");
    }
  };

  const handleAddSeat = () => {
    const newSeats = availableSeats + 1;
    setAvailableSeats(newSeats);
    updateAvailableSeats(newSeats);
  };

  const handleDeductSeat = () => {
    if (availableSeats > 0) {
      const newSeats = availableSeats - 1;
      setAvailableSeats(newSeats);
      updateAvailableSeats(newSeats);
    }
  };

  // 🔴 DELETE FEATURE
  const deleteDriver = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your driver account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:3000/drivers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("driverToken");
      alert("Driver account deleted successfully");
      window.location.href = "/driver-login";
    } catch (err) {
      console.error(err);
      alert("Failed to delete driver account");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Unable to load driver data
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-300">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="mt-4 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-900">Driver Panel</h2>
          <div className="flex items-center space-x-5">
            <button
              onClick={() => navigate("/reservations")}
              className="px-5 py-2 text-green-800 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              View Reservations
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Driver Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4 pb-3 border-b">
                Driver Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-base font-semibold text-gray-800">{driver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-semibold text-gray-800">{driver.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Van Plate Number</p>
                  <p className="text-base font-semibold text-gray-800">{driver.van?.plateNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Management Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4 pb-3 border-b">
                Van Status Management
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="Traveling">Traveling</option>
                  <option value="Arrived">Arrived</option>
                  <option value="Parked">Parked</option>
                </select>
              </div>

              <button
                onClick={updateStatus}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
              >
                Update Status
              </button>

              {/* Available Seats Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Available Seats
                </label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                  <span className="text-3xl font-bold text-gray-800">{availableSeats}</span>
                </div>
              </div>

              {message && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-center font-semibold">
                    {message}
                  </p>
                </div>
              )}

              {/* Delete Account Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Danger Zone</h4>
                <button
                  onClick={deleteDriver}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl border border-red-200 transition"
                >
                  Delete Driver Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
