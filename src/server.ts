import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import errorHandler from "./middleware/errorHandler";
import { logErrorToDb } from "./utils/logger";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // if connection fails, try to log locally
    logErrorToDb({ message: "Mongo connection failed", stack: err.stack || "" }).catch(console.error);
  });
