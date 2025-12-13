import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DriverPanel() {
  const [driver, setDriver] = useState(null);
  const [status, setStatus] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch driver details on mount
  useEffect(() => {
    const token = localStorage.getItem("driverToken");
    if (!token) return;

    axios
      .get("http://localhost:3000/drivers/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDriver(res.data);
        setStatus(res.data.van?.status || "Waiting");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateVanStatus = () => {
    const token = localStorage.getItem("driverToken");
    axios
      .put(
        `http://localhost:3000/drivers/${driver._id}/van-status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const updateProfilePic = () => {
    if (!profilePic) return;
    const token = localStorage.getItem("driverToken");
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    axios
      .put(`http://localhost:3000/drivers/${driver._id}/profile-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDriver((prev) => ({ ...prev, profilePic: res.data.driver.profilePic }));
        setMessage("Profile picture updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  if (!driver) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Driver Panel</h2>

      {/* Driver Info */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-6">
        <img
          src={driver.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <p><strong>Name:</strong> {driver.name}</p>
        <p><strong>Email:</strong> {driver.email}</p>
        <p><strong>License ID:</strong> {driver.licenseId}</p>
        <p><strong>Address:</strong> {driver.address}</p>
        <p><strong>Age:</strong> {driver.age}</p>
        <p><strong>Birthday:</strong> {new Date(driver.birthday).toLocaleDateString()}</p>
        <p><strong>Van Plate Number:</strong> {driver.van?.plateNumber}</p>
      </div>

      {/* Update Van Status */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-6">
        <h3 className="font-semibold mb-2">Update Van Status</h3>
        <select
          value={status}
          onChange={handleStatusChange}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="Waiting">Waiting</option>
          <option value="Traveling">Traveling</option>
          <option value="Arrived">Arrived</option>
          <option value="Parked">Parked</option>
        </select>
        <button
          onClick={updateVanStatus}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Update Status
        </button>
      </div>

      {/* Update Profile Picture */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-6">
        <h3 className="font-semibold mb-2">Change Profile Picture</h3>
        <input type="file" onChange={handleProfilePicChange} className="mb-4" />
        <button
          onClick={updateProfilePic}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Update Picture
        </button>
      </div>

      {message && <p className="text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
