import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    const match = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!match) {
      return NextResponse.json(
        {
          message: "Current password is incorrect",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: admin.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}