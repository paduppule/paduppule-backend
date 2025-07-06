import { Router } from "express";
import { createSection, getCourseSections } from "../controllers/section.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createSection);
router.get("/:courseId", protect, getCourseSections);

export default router; 