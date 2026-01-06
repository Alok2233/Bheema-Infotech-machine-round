import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Messages() {
  const [senders, setSenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const { data } = await API.get("/chat");
        setSenders(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load messages");
      }
    };
    fetchSenders();
  }, []);

  return (
    <div className="mt-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-primary mb-6"
      >
        Messages 📥
      </motion.h2>

      {senders.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {senders.map((u) => (
            <div
              key={u._id}
              onClick={() => navigate(`/chat/${u._id}`)}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer flex flex-col items-center"
            >
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${u.name}`}
                alt="avatar"
                className="w-20 h-20 rounded-full mb-3"
              />
              <h3 className="font-semibold text-lg">{u.name}</h3>
              <p className="text-sm text-gray-500">{u.gender}, {u.age}</p>
              <span className="mt-2 text-primary text-sm">Tap to chat ➤</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
