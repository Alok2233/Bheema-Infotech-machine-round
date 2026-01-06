import { useEffect, useState } from "react";
import API from "../api/axios";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function NearbyUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/nearby-users");
        setUsers(data);
      } catch {
        alert("Error loading users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-28 px-6">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-primary mb-6">
          People Near You 🌍
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map(u => <UserCard key={u._id} user={u} />)}
        </div>
      </div>
    </>
  );
}
