import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: ទាញយកព័ត៌មានលម្អិតរបស់ Order តាម ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        payment: true,
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch order details:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// 2. PUT: អាប់ដេត Status របស់ Order តាម ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);
    const body = await req.json();
    const { status } = body;

    if (isNaN(orderId)) {
      return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        user: true,
        payment: true,
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Order updated successfully", order: updatedOrder },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}