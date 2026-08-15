import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // ស្វែងរកការបញ្ជាទិញទាំងអស់ដែលមាន Status ជា PAID
    const paidOrders = await prisma.order.findMany({
      where: {
        status: "PAID",
      },
      select: {
        total: true,
      },
    });

    // គណនាបូកសរុបទឹកប្រាក់ទាំងអស់
    const totalRevenue = paidOrders.reduce((acc, order) => acc + (order.total || 0), 0);

    return NextResponse.json({
      success: true,
      revenue: totalRevenue,
    });
  } catch (error) {
    console.error("REVENUE_API_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}