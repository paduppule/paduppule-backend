import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", protect, createCategory); // Protect this for admin later

export default router;
