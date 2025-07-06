import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getInstructorDashboard, getCourseAnalytics } from "../controllers/instructor.controller";

const router = Router();

// Get instructor dashboard overview
router.get("/dashboard", protect, getInstructorDashboard);

// Get detailed analytics for a specific course
router.get("/course/:courseId/analytics", protect, getCourseAnalytics);

export default router; 