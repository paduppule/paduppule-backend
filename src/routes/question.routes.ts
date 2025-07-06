import { Router } from "express";
import { createQuestion, getQuestions } from "../controllers/question.controller";
import { protect } from "../middlewares/auth.middleware";
import { upload } from "../utils/fileUpload";

const router = Router();

router.get("/", protect, getQuestions);
router.post("/", protect, upload.single("image"), createQuestion);

export default router;
