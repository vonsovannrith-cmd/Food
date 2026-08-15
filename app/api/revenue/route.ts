import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // កែសម្រួល៖ បើកឱ្យទាញយកគ្រប់ Status ដើម្បីតេស្តមើលទិន្នន័យ
    const orders = await prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
        status: true,
      },
    });

    const daysMap: { [key: string]: number } = {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0,
    };
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    orders.forEach((order) => {
      // គណនាតែ orders ដែល PAID ឬ PENDING (តាមតម្រូវការរបស់អ្នក)
      if (order.status === "PAID" || order.status === "PENDING") {
        const date = new Date(order.createdAt);
        const dayName = dayNames[date.getDay()];
        daysMap[dayName] += Number(order.total || 0);
      }
    });

    const formattedData = Object.keys(daysMap).map((day) => ({
      date: day,
      revenue: daysMap[day],
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}