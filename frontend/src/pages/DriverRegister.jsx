import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post("http://localhost:3000/drivers/register", form);
      alert(res.data.message);

      // Login immediately to get token
      const loginRes = await axios.post("http://localhost:3000/drivers/login", {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Driver Registration</h2>

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
          <div className="mb-4" key={field.name}>
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-xl hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
