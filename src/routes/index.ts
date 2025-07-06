import { Router } from "express";
import authRoutes from "./auth.routes";
import quizRoutes from "./routes.quiz"; 
import categoryRoutes from "./category.routes";
import questionRoutes from "./question.routes";
import progressRoutes from "./progress.routes";
import leaderboardRoutes from "./leaderboard.routes";
import courseRoutes from "./course.routes";
import paymentRoutes from "./payment.routes";
const router = Router();

router.use("/auth", authRoutes); // Mount under /api/auth
router.use("/quiz", quizRoutes); // Mount under /api/quiz
router.use("/category", categoryRoutes); // Mount under /api/category
router.use("/question", questionRoutes); // Mount under /api/question
router.use("/users/progress", progressRoutes); // Mount under /api/users/progress
router.use("/leaderboards", leaderboardRoutes); // Mount under /api/leaderboards
router.use("/courses", courseRoutes); // Mount under /api/courses
router.use("/payments", paymentRoutes); // Mount under /api/payments

export default router;