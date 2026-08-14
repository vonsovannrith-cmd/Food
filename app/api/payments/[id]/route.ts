import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status } = body;

    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
  }
}