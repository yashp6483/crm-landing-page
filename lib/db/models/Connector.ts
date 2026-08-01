import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISyncLog {
  id: string;
  timestamp: string;
  status: "SUCCESS" | "FAILED" | "WARNING";
  leadsImported: number;
  message: string;
}

export interface IConnector extends Document {
  connectorId: string;
  name: string;
  category: string;
  status: "ACTIVE" | "PAUSED" | "ERROR";
  syncSpeed: string;
  lastSyncedAt: string;
  totalLeadsSynced: number;
  autoImport: boolean;
  apiKeyOrWebhookUrl: string;
  syncLogs: ISyncLog[];
  createdAt: Date;
  updatedAt: Date;
}

const ConnectorSchema: Schema<IConnector> = new Schema(
  {
    connectorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "PAUSED", "ERROR"], default: "ACTIVE" },
    syncSpeed: { type: String, default: "< 2s" },
    lastSyncedAt: { type: String, default: "Just now" },
    totalLeadsSynced: { type: Number, default: 0 },
    autoImport: { type: Boolean, default: true },
    apiKeyOrWebhookUrl: { type: String, default: "" },
    syncLogs: [
      {
        id: { type: String },
        timestamp: { type: String },
        status: { type: String, enum: ["SUCCESS", "FAILED", "WARNING"] },
        leadsImported: { type: Number },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ConnectorModel: Model<IConnector> =
  mongoose.models.Connector || mongoose.model<IConnector>("Connector", ConnectorSchema);
