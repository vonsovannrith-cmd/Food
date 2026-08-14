import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      phone,
      address
    } = body;

    // Validate
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Email and Password are required."
        },
        { status: 400 }
      );
    }

    // Check email
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists."
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Register successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}
// បន្ថែម GET function នេះក្នុង app/api/auth/register/route.ts
export async function GET() {
  return NextResponse.json(
    { message: "Register API is active. Please use POST method to register." },
    { status: 200 }
  );
}