import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-5 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
    >
      <img
        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.name}`}
        alt="avatar"
        className="w-24 h-24 mx-auto rounded-full mb-3"
      />
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.gender}, {user.age}</p>

      <button
        onClick={() => navigate(`/chat/${user._id}`)}
        className="mt-3 bg-red-600 hover:bg-red-300 text-black px-4 py-2 rounded-md"
      >
       CHAT
      </button>
    </motion.div>
  );
}
