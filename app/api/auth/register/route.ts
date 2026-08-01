import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { UserModel } from "@/lib/db/models/User";
import { hashPassword } from "@/lib/auth/bcrypt";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, companyName } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Name, email, and password are required" }, { status: 400 });
    }

    await connectToDatabase();
    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: "User with this email already exists in database" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || "SALES",
      companyName: companyName || "Orbit Global Technologies",
      department: role === "HR" ? "Human Resources" : "Sales & Revenue",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    });

    const payload = {
      userId: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      companyName: newUser.companyName,
    };

    const token = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return NextResponse.json({
      success: true,
      token,
      refreshToken,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyName: newUser.companyName,
        department: newUser.department,
        avatarUrl: newUser.avatarUrl,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Auth Register API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
