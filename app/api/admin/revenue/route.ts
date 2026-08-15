import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // យកទិន្នន័យ Order ទាំងអស់មកគណនា
    const orders = await prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
        status: true,
      },
    });

    const daysMap: { [key: string]: number } = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    orders.forEach((order) => {
      // គណនាតែបញ្ជាទិញដែលមាន Status ជា PAID ឬ PENDING
      if (order.status === "PAID" || order.status === "PENDING") {
        const date = new Date(order.createdAt);
        const dayName = dayNames[date.getDay()];
        if (daysMap[dayName] !== undefined) {
          daysMap[dayName] += Number(order.total || 0);
        }
      }
    });

    // ប្តូរ Key ឱ្យត្រូវគ្នាជាមួយ XAxis dataKey="month" ឬ dataKey="date"
    const formattedData = Object.keys(daysMap).map((day) => ({
      month: day,
      revenue: daysMap[day],
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