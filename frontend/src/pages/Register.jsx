import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    latitude: "",
    longitude: "",
  });

  const [detecting, setDetecting] = useState(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
          setDetecting(false);
        },
        (err) => {
          console.warn("Location not allowed:", err);
          setDetecting(false);
        }
      );
    } else {
      console.warn("Geolocation not supported");
      setDetecting(false);
    }
  }, []);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      alert("Please allow location access to register.");
      return;
    }

    try {
        await API.post("/register", form);
          alert("🎉 Registration successful!");
                navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center mt-28 px-4"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-primary mb-4"
      >
        Create Account 
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              min="18"
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 mt-4">
          {detecting ? (
            <p>📡 Detecting your location...</p>
          ) : form.latitude && form.longitude ? (
            <p className="text-green-600">
              📍 Location detected: {form.latitude.toFixed(4)},{" "}
              {form.longitude.toFixed(4)}
            </p>
          ) : (
            <p className="text-red-500">
              ❌ Unable to detect location — please allow access.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-300 text-white font-semibold py-2 rounded-md mt-4 transition-all duration-300"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
}
