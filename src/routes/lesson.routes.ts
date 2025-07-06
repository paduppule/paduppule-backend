import { Router } from "express";
import { createLesson, getLessonsBySection, uploadAttachments } from "../controllers/lesson.controller";
import { protect } from "../middlewares/auth.middleware";
import { hasCourseAccess } from "../middlewares/hasCourseAccess.middleware";
import { fileUpload } from "../utils/fileUpload";

const router = Router();

router.post("/", protect, createLesson);
router.get("/:sectionId", protect, getLessonsBySection);
router.post("/:lessonId/attachments", protect, fileUpload.array("files"), uploadAttachments);

export default router; 