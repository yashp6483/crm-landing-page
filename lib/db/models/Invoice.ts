import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  hsnCode?: string;
}

export interface IInvoice extends Document {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientGstin: string;
  taxType: "INTRA_STATE" | "INTER_STATE"; // INTRA_STATE = CGST+SGST, INTER_STATE = IGST
  items: IInvoiceItem[];
  subtotal: number;
  discount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  total: number;
  status: "PAID" | "DUE" | "OVERDUE" | "CANCELLED";
  dueDate: string;
  paymentLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema: Schema<IInvoice> = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: { type: String, default: "" },
    clientGstin: { type: String, default: "" },
    taxType: { type: String, enum: ["INTRA_STATE", "INTER_STATE"], default: "INTRA_STATE" },
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        unitPrice: { type: Number, required: true, default: 0 },
        amount: { type: Number, required: true, default: 0 },
        hsnCode: { type: String, default: "998313" },
      },
    ],
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    cgstRate: { type: Number, default: 9 },
    cgstAmount: { type: Number, default: 0 },
    sgstRate: { type: Number, default: 9 },
    sgstAmount: { type: Number, default: 0 },
    igstRate: { type: Number, default: 18 },
    igstAmount: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ["PAID", "DUE", "OVERDUE", "CANCELLED"], default: "DUE" },
    dueDate: { type: String, required: true },
    paymentLink: { type: String, default: "" },
  },
  { timestamps: true }
);

export const InvoiceModel: Model<IInvoice> =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);
