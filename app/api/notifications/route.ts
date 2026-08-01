import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NotificationModel } from "@/lib/db/models/Notification";

export async function GET() {
  try {
    await connectToDatabase();
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notifications });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT() {
  try {
    await connectToDatabase();
    await NotificationModel.updateMany({}, { read: true });
    return NextResponse.json({ success: true, message: "All notifications marked as read" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
