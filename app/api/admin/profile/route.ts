import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace with authenticated admin user later
    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load profile" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.user.update({
      where: {
        id: admin.id,
      },
      data: {
        name: body.name,
        phone: body.phone,
        address: body.address,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}