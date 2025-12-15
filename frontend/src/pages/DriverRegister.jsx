import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

export default function DriverRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    licenseId: "",
    address: "",
    age: "",
    birthday: "",
    email: "",
    password: "",
    plateNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/drivers/register`, form);
      alert(res.data.message);

<<<<<<< HEAD
      const loginRes = await axios.post("http://localhost:3000/drivers/login", {
=======
      // Login immediately to get token
      const loginRes = await axios.post(`${API_URL}/drivers/login`, {
>>>>>>> fbf7806a30184e321de93c4135c087b563dc5c7a
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("driverToken", loginRes.data.token);
      navigate("/driver-panel");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex text-left justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full hover:shadow-3xl transition duration-300"
      >
        <h2 className="text-3xl font-extrabold mb-5 text-center  text-green-900">
          Driver Registration
        </h2>

        {[
          { label: "Name", name: "name", type: "text" },
          { label: "License ID", name: "licenseId", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Age", name: "age", type: "number" },
          { label: "Birthday", name: "birthday", type: "date" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Van Plate Number", name: "plateNumber", type: "text" },
        ].map((field) => (
          <div className="mb-5" key={field.name}>
            <label className="block mb-2 font-semibold text-green-900">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full p-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-400 outline-none transition duration-300 text-black"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition transform hover:scale-105 duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
