import { Router } from "express";
import authRoutes from "./auth.routes";
import quizRoutes from "./routes.quiz"; 
import categoryRoutes from "./category.routes";
import questionRoutes from "./question.routes";
import progressRoutes from "./progress.routes";
import leaderboardRoutes from "./leaderboard.routes";
import courseRoutes from "./course.routes";
import paymentRoutes from "./payment.routes";
import sectionRoutes from "./section.routes";
import lessonRoutes from "./lesson.routes";
import completionRoutes from "./completion.routes";
import certificateRoutes from "./certificate.routes";
import instructorRoutes from "./instructor.routes";
import adminRoutes from "./admin.routes";
const router = Router();

router.use("/auth", authRoutes); // Mount under /api/auth
router.use("/quiz", quizRoutes); // Mount under /api/quiz
router.use("/category", categoryRoutes); // Mount under /api/category
router.use("/question", questionRoutes); // Mount under /api/question
router.use("/users/progress", progressRoutes); // Mount under /api/users/progress
router.use("/leaderboards", leaderboardRoutes); // Mount under /api/leaderboards
router.use("/courses", courseRoutes); // Mount under /api/courses
router.use("/payments", paymentRoutes); // Mount under /api/payments
router.use("/sections", sectionRoutes); // Mount under /api/sections
router.use("/lessons", lessonRoutes); // Mount under /api/lessons
router.use("/completions", completionRoutes); // Mount under /api/completions
router.use("/certificates", certificateRoutes); // Mount under /api/certificates
router.use("/instructor", instructorRoutes); // Mount under /api/instructor
router.use("/admin", adminRoutes); // Mount under /api/admin

export default router;