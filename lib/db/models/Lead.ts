import mongoose, { Schema, Document, Model } from "mongoose";

export type LeadStatus = "NEW" | "QUALIFIED" | "DEMO_SCHEDULED" | "PROPOSAL_SENT" | "NEGOTIATION" | "WON" | "LOST";
export type LeadPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface ILeadLog {
  id: string;
  type: "CALL" | "EMAIL" | "WHATSAPP" | "NOTE" | "STAGE_CHANGE";
  content: string;
  author: string;
  timestamp: string;
}

export interface ILead extends Document {
  title: string;
  contactName: string;
  email: string;
  phone: string;
  companyName: string;
  value: number;
  currency: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: string;
  assignedToName: string;
  assignedToEmail: string;
  tags: string[];
  notes: string;
  logs: ILeadLog[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, default: "Individual Buyer" },
    value: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["NEW", "QUALIFIED", "DEMO_SCHEDULED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"],
      default: "NEW",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
    },
    source: { type: String, default: "Facebook Lead Ads" },
    assignedToName: { type: String, default: "Sarah Jenkins" },
    assignedToEmail: { type: String, default: "sarah@orbit360.com" },
    tags: [{ type: String }],
    notes: { type: String, default: "" },
    logs: [
      {
        id: { type: String },
        type: { type: String, enum: ["CALL", "EMAIL", "WHATSAPP", "NOTE", "STAGE_CHANGE"] },
        content: { type: String },
        author: { type: String },
        timestamp: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const LeadModel: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
