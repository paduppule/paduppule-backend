import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import mongoose from "mongoose";
import express from "express";
import routes from "./routes"; // or the correct path

const PORT = process.env.PORT || 4000;

const mongoUri = process.env.MONGODB_URI as string;
mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

const server = express();

server.use("/api", routes); // Correct usage
