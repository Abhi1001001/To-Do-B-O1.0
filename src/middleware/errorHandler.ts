import { Request, Response, NextFunction } from "express";
import { logErrorToDb } from "../utils/logger";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  // log into DB
  logErrorToDb({ message: err.message || "Server error", stack: err.stack, route: req.originalUrl });
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
}
