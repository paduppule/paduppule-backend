import { Router } from "express";
import { createCourse, getCourses, enrollInCourse } from "../controllers/course.controller";
import { protect } from "../middlewares/auth.middleware";
import { fileUpload } from "../utils/fileUpload";

const router = Router();

router.get("/", getCourses);
router.post("/", protect, fileUpload.single("image"), createCourse);
router.post("/enroll", protect, enrollInCourse);

export default router;
