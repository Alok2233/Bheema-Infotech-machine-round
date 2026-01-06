import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, age, latitude, longitude } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      gender,
      age,
      location: { type: "Point", coordinates: [longitude, latitude] }
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getNearbyUsers = async (req, res) => {
  try {
    const { coordinates } = req.user.location;
    if (!coordinates)
      return res.status(400).json({ message: "User has no saved location" });

    const users = await User.find({
      _id: { $ne: req.user._id },
      location: {
        $near: {
          $geometry: { type: "Point", coordinates },
          $maxDistance: 10000
        }
      }
    }).select("-password");

    res.json(users);
  } catch (err) {
    console.error("Nearby error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


