import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes"; // This should import a router object
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes); // ✅ Correct usage

// Error handling (must come after routes)
app.use(errorHandler);

export default app;