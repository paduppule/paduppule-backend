import { Router } from "express";
import { getGlobalLeaderboard } from "../controllers/leaderboard.controller";

const router = Router();
router.get("/global", getGlobalLeaderboard);
export default router;
