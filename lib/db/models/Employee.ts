import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  companyName: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  baseSalary?: number;
  allowances?: number;
  deductions?: number;
  netSalary?: number;
  status: "ACTIVE" | "ON_LEAVE" | "TERMINATED";
  avatarUrl: string;
  quotaAchievement: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema<IEmployee> = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    companyId: { type: String, default: "comp-orbit-global" },
    companyName: { type: String, default: "Orbit Global Technologies" },
    department: { type: String, required: true, default: "Sales" },
    designation: { type: String, required: true, default: "Account Executive" },
    joiningDate: { type: String, required: true, default: "2024-01-15" },
    salary: { type: Number, required: true, default: 75000 },
    baseSalary: { type: Number, default: 60000 },
    allowances: { type: Number, default: 20000 },
    deductions: { type: Number, default: 5000 },
    netSalary: { type: Number, default: 75000 },
    status: { type: String, enum: ["ACTIVE", "ON_LEAVE", "TERMINATED"], default: "ACTIVE" },
    avatarUrl: { type: String, default: "" },
    quotaAchievement: { type: String, default: "100%" },
  },
  { timestamps: true }
);

export const EmployeeModel: Model<IEmployee> =
  mongoose.models.Employee || mongoose.model<IEmployee>("Employee", EmployeeSchema);
