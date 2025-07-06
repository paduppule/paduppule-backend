import { Router } from "express";
import { getUserStats } from "../controllers/progress.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", protect, getUserStats);
export default router;
