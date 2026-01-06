import express from "express";
import { registerUser, loginUser, getNearbyUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/nearby-users", protect, getNearbyUsers);

export default router;
