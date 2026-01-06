import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/nearby-users");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <motion.div className="flex flex-col items-center mt-28">
      <h2 className="text-3xl font-bold mb-4 text-primary">Welcome Back 💫</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4">
        <input className="border w-full p-2 rounded" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border w-full p-2 rounded" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" className="w-full">Login</button>
      </form>
    </motion.div>
  );
}
