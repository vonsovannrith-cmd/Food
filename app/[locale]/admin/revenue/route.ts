import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // យក Orders ទាំងអស់ដែលមាន Status เป็น PAID
    const orders = await prisma.order.findMany({
      where: {
        status: "PAID",
      },
      select: {
        total: true,
        createdAt: true,
      },
    });

    // បង្កើត Mapping សម្រាប់ថ្ងៃក្នុងសប្តាហ៍
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
      const date = new Date(order.createdAt);
      const dayName = dayNames[date.getDay()];
      if (daysMap[dayName] !== undefined) {
        daysMap[dayName] += Number(order.total || 0);
      }
    });

    const formattedData = Object.keys(daysMap).map((day) => ({
      date: day,
      revenue: daysMap[day],
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("REVENUE_CHART_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}