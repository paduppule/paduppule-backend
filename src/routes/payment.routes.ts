import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { payForCourse, verifyPayment } from "../controllers/payment.controller";

const router = Router();

router.post("/init", protect, payForCourse); // Starts payment
router.post("/verify", verifyPayment);       // Called after frontend payment

export default router;
