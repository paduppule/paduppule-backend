import { Router } from "express";
import { generateQuiz, submitQuiz, getAttempt } from "../controllers/quiz.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/generate", protect, generateQuiz);
router.post("/submit", protect, submitQuiz);
router.get("/attempt/:id", protect, getAttempt);

export default router;
