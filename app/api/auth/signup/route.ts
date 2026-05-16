import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { TOKEN_COOKIE } from "@/lib/constants";
import { User } from "@/models/user";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = signToken({
      userId: String(user._id),
      email: user.email,
      name: user.name
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
