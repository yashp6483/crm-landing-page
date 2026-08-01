import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { UserModel } from "@/lib/db/models/User";
import { verifyPassword } from "@/lib/auth/bcrypt";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password. User not found in database." }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    const payload = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      companyName: user.companyName,
    };

    const token = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    return NextResponse.json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName || "Orbit Global Technologies",
        department: user.department,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error: any) {
    console.error("Auth Login API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
