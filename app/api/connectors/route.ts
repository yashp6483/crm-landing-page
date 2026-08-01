import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ConnectorModel } from "@/lib/db/models/Connector";

export async function GET() {
  try {
    await connectToDatabase();
    const connectors = await ConnectorModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: connectors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, autoImport, status } = await req.json();
    const updated = await ConnectorModel.findByIdAndUpdate(
      id,
      { ...(autoImport !== undefined && { autoImport }), ...(status && { status }) },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
