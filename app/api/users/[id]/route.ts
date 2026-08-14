import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// UPDATE ROLE
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const userId = Number(resolvedParams.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body?.role) {
      return NextResponse.json(
        { message: "Role is required in request body" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: body.role,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

// DELETE USER
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const userId = Number(resolvedParams.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}