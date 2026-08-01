import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { LeadModel } from "@/lib/db/models/Lead";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");

    const query: any = {};
    if (status && status !== "ALL") query.status = status;
    if (priority && priority !== "ALL") query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { contactName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await LeadModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newLead = await LeadModel.create({
      ...body,
      logs: [
        {
          id: "log-" + Date.now(),
          type: "NOTE",
          content: "Lead created and added to pipeline.",
          author: body.assignedToName || "System",
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        },
      ],
    });

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
