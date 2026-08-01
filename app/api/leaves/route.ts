import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { LeaveModel } from "@/lib/db/models/Leave";

export async function GET() {
  try {
    await connectToDatabase();
    const leaves = await LeaveModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leaves });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newLeave = await LeaveModel.create(body);
    return NextResponse.json({ success: true, data: newLeave }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, status, approvedBy } = await req.json();
    const updated = await LeaveModel.findByIdAndUpdate(
      id,
      { status, approvedBy: approvedBy || "Elena Rostova" },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
