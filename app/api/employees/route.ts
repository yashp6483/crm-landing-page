import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { EmployeeModel } from "@/lib/db/models/Employee";

export async function GET() {
  try {
    await connectToDatabase();
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: employees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const count = await EmployeeModel.countDocuments();
    const newEmp = await EmployeeModel.create({
      ...body,
      employeeId: `EMP-${101 + count}`,
    });
    return NextResponse.json({ success: true, data: newEmp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
