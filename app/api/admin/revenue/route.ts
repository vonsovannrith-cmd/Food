import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // យក Orders ទាំងអស់មកគណនា
    const orders = await prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
        status: true,
      },
    });

    // កំណត់ខែទាំង ១២ ទុកជាមុន ឱ្យតម្លៃស្មើ 0
    const monthsMap: { [key: string]: number } = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
    };

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    orders.forEach((order) => {
      // អ្នកអាចកែសម្រួល Status តាមតម្រូវការ (ឧទាហរណ៍៖ PAID, COMPLETED ឬ យកទាំងអស់)
      if (order.status === "PAID" || order.status === "COMPLETED") {
        const date = new Date(order.createdAt);
        const monthName = monthNames[date.getMonth()]; // ទាញយកឈ្មោះខែតាម createdAt
        if (monthsMap[monthName] !== undefined) {
          monthsMap[monthName] += Number(order.total || 0);
        }
      }
    });

    // แปลงទិន្នន័យឱ្យស្របតាម Chart Component
    const formattedData = Object.keys(monthsMap).map((month) => ({
      month: month,
      revenue: monthsMap[month],
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("REVENUE_API_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}