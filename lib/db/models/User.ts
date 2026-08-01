import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "ADMIN" | "SALES" | "HR" | "EMPLOYEE";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  companyId: string;
  companyName: string;
  avatarUrl?: string;
  department?: string;
  phone?: string;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "SALES", "HR", "EMPLOYEE"], default: "SALES" },
    companyId: { type: String, default: "comp-orbit-global" },
    companyName: { type: String, default: "Orbit Global Technologies" },
    avatarUrl: { type: String, default: "" },
    department: { type: String, default: "Sales" },
    phone: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
