import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type: "LEAD_ASSIGNED" | "NEW_LEAD" | "INVOICE_PAID" | "LEAVE_APPROVED" | "SYSTEM";
  read: boolean;
  userEmail?: string;
  createdAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["LEAD_ASSIGNED", "NEW_LEAD", "INVOICE_PAID", "LEAVE_APPROVED", "SYSTEM"],
      default: "SYSTEM",
    },
    read: { type: Boolean, default: false },
    userEmail: { type: String, default: "" },
  },
  { timestamps: true }
);

export const NotificationModel: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
