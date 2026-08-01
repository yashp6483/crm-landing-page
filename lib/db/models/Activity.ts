import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivity extends Document {
  user: string;
  action: string;
  module: "LEADS" | "HRMS" | "INVOICE" | "CONNECTOR" | "AUTH" | "ADMIN";
  details: string;
  ipAddress?: string;
  createdAt: Date;
}

const ActivitySchema: Schema<IActivity> = new Schema(
  {
    user: { type: String, required: true },
    action: { type: String, required: true },
    module: { type: String, enum: ["LEADS", "HRMS", "INVOICE", "CONNECTOR", "AUTH", "ADMIN"], required: true },
    details: { type: String, required: true },
    ipAddress: { type: String, default: "127.0.0.1" },
  },
  { timestamps: true }
);

export const ActivityModel: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);
