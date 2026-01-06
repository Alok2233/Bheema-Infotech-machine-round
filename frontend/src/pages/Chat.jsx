import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/axios";
import { motion } from "framer-motion";

const socket = io("http://localhost:5000");

export default function Chat() {
  const { receiverId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const room = [user._id, receiverId].sort().join("_");
    socket.emit("join_room", room);

    const fetchMessages = async () => {
      const { data } = await API.get(`/chat/${receiverId}`);
      setMessages(data);
    };
    fetchMessages();

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [receiverId]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const msgData = {
      room: [user._id, receiverId].sort().join("_"),
      sender: user._id,
      receiver: receiverId,
      message,
    };
    socket.emit("send_message", msgData);
    await API.post("/chat", { receiver: receiverId, message });
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center bg-green-600 text-white p-4 shadow-md"
      >
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${receiverId}`}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="font-semibold text-lg">Chat</h2>
      </motion.div>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-chat-pattern"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                msg.sender === user._id
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow rounded-bl-none"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center p-3 bg-white border-t border-gray-200"
      >
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
