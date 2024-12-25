import express from "express";
import { adminLogin, adminLogout, createAdmin } from "../controllers/dentistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Admin logout (protected by JWT token verification)
router.post("/logout", adminLogout);

// Create admin (No API Key check, accessible to all with proper JWT)
router.post("/create", createAdmin);

export default router;
