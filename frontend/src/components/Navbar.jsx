import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center p-4 shadow-md bg-white fixed w-full top-0 z-10"
    >
      <Link to="/" className="text-2xl font-bold text-primary">💞 MeetMate</Link>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-primary">Register</Link>
          </>
        ) : (
          <>
            <Link to="/nearby-users" className="text-gray-700 hover:text-primary">Nearby</Link>
            <Link to="/messages" className="text-gray-700 hover:text-primary">Messages</Link>
            <button onClick={logout}>Logout</button>

          </>
        )}
      </div>
    </motion.nav>
  );
}
