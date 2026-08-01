import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeave extends Document {
  employeeName: string;
  employeeEmail: string;
  leaveType: "CASUAL" | "SICK" | "PAID" | "UNPAID";
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveSchema: Schema<ILeave> = new Schema(
  {
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    leaveType: { type: String, enum: ["CASUAL", "SICK", "PAID", "UNPAID"], default: "CASUAL" },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    approvedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export const LeaveModel: Model<ILeave> =
  mongoose.models.Leave || mongoose.model<ILeave>("Leave", LeaveSchema);
