import mongoose, { Document } from "mongoose";

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  route?: string;
  timestamp: Date;
}

const errorLogSchema = new mongoose.Schema<IErrorLog>({
  message: { type: String, required: true },
  stack: { type: String },
  route: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IErrorLog>("ErrorLog", errorLogSchema);
