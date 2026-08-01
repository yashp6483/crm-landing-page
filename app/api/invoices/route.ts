import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { InvoiceModel } from "@/lib/db/models/Invoice";

export async function GET() {
  try {
    await connectToDatabase();
    const invoices = await InvoiceModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: invoices });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const count = await InvoiceModel.countDocuments();
    const invoiceNumber = `INV-2026-${891 + count}`;

    // GST Auto-Calculation
    const subtotal = body.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
    const discount = body.discount || 0;
    const taxableValue = Math.max(0, subtotal - discount);

    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;

    if (body.taxType === "INTER_STATE") {
      igstAmount = Math.round((taxableValue * (body.igstRate || 18)) / 100);
    } else {
      cgstAmount = Math.round((taxableValue * (body.cgstRate || 9)) / 100);
      sgstAmount = Math.round((taxableValue * (body.sgstRate || 9)) / 100);
    }

    const total = taxableValue + cgstAmount + sgstAmount + igstAmount;

    const newInvoice = await InvoiceModel.create({
      ...body,
      invoiceNumber,
      subtotal,
      cgstAmount,
      sgstAmount,
      igstAmount,
      total,
      paymentLink: `https://stripe.com/pay/${invoiceNumber.toLowerCase()}`,
    });

    return NextResponse.json({ success: true, data: newInvoice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
