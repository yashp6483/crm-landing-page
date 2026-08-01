import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { AttendanceModel } from "@/lib/db/models/Attendance";

export async function GET() {
  try {
    await connectToDatabase();
    const attendance = await AttendanceModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const now = new Date();
    const record = await AttendanceModel.create({
      employeeName: body.employeeName || "Sarah Jenkins",
      employeeEmail: body.employeeEmail || "sarah.jenkins@orbit360.com",
      date: now.toISOString().substring(0, 10),
      checkIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: body.status || "ON_TIME",
      location: body.location || "Orbit HQ - San Francisco (GPS Verified)",
      latitude: body.latitude || 28.6139,
      longitude: body.longitude || 77.2090,
    });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
