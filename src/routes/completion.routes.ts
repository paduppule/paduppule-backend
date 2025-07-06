import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { markLessonComplete, getCompletedLessons } from "../controllers/completion.controller";
import { fileUpload } from "../utils/fileUpload";

const router = Router();

router.post("/", protect, markLessonComplete);
router.get("/", protect, getCompletedLessons);

export default router; 