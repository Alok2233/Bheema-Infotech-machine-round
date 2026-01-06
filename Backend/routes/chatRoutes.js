import express from "express";
import Chat from "../models/Chat.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const chat = await Chat.create({
      sender: req.user._id,
      receiver,
      message
    });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Error saving message", error: err.message });
  }
});

router.get("/:userId", protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats", error: err.message });
  }
});
router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ receiver: req.user._id })
      .populate("sender", "name email gender age")
      .sort({ createdAt: -1 });
    const uniqueSenders = [];
    const seen = new Set();
    for (const chat of chats) {
      if (!seen.has(chat.sender._id.toString())) {
        seen.add(chat.sender._id.toString());
        uniqueSenders.push(chat.sender);
      }
    }

    res.json(uniqueSenders);
  } catch (err) {
    res.status(500).json({ message: "Error loading received messages", error: err.message });
  }
});


export default router;
