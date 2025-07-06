import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { generateCertificate, getUserCertificates, verifyCertificate } from "../controllers/certificate.controller";

const router = Router();

// Generate certificate for completed course
router.post("/generate", protect, generateCertificate);

// Get user's certificates
router.get("/user", protect, getUserCertificates);

// Verify certificate (public endpoint)
router.get("/verify/:certificateNumber", verifyCertificate);

export default router; 