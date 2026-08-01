import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendance extends Document {
  employeeName: string;
  employeeEmail: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: "ON_TIME" | "LATE" | "REMOTE" | "ABSENT";
  location?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema<IAttendance> = new Schema(
  {
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    date: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, default: "" },
    status: { type: String, enum: ["ON_TIME", "LATE", "REMOTE", "ABSENT"], default: "ON_TIME" },
    location: { type: String, default: "HQ Office (Geo Verified)" },
    latitude: { type: Number, default: 28.6139 },
    longitude: { type: Number, default: 77.209 },
  },
  { timestamps: true }
);

export const AttendanceModel: Model<IAttendance> =
  mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);
