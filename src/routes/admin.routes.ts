import express from "express";
import { generateNewApiKey, getSystemInfo } from "../controllers/admin.controller";
import { requireApiKey } from "../middlewares/auth.middleware";

const router = express.Router();

// Admin routes - require API key authentication
router.use(requireApiKey);

// Generate new API key
router.post("/generate-api-key", generateNewApiKey);

// Get system information
router.get("/system-info", getSystemInfo);

export default router; 