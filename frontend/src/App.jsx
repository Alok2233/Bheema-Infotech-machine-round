import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NearbyUsers from "./pages/NearbyUsers";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nearby-users" element={<NearbyUsers />} />
        
<Route path="/chat/:receiverId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
