import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      totalFoods,
      totalCategories,
      totalOrders,
      totalUsers,
      payments,
      recentOrders,
      topFoods,
    ] = await Promise.all([
      prisma.food.count(),

      prisma.category.count(),

      prisma.order.count(),

      prisma.user.count(),

      prisma.payment.findMany({
        where: {
          status: "PAID",
        },
        select: {
          amount: true,
        },
      }),

      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),

      prisma.orderItem.groupBy({
        by: ["foodId"],

        _sum: {
          quantity: true,
        },

        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },

        take: 5,
      }),
    ]);

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const foods = await Promise.all(
      topFoods.map(async (item) => {
        const food = await prisma.food.findUnique({
          where: {
            id: item.foodId,
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });

        return {
          id: food?.id,
          name: food?.name,
          image: food?.image,
          sold: item._sum.quantity ?? 0,
        };
      })
    );

    // Monthly Revenue (Current Year)
    const year = new Date().getFullYear();

    const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
      return {
        month: new Date(year, index).toLocaleString("en-US", {
          month: "short",
        }),
        revenue: 0,
      };
    });

    const paidOrders = await prisma.payment.findMany({
      where: {
        status: "PAID",
      },
      include: {
        order: true,
      },
    });

    paidOrders.forEach((payment) => {
      const month = payment.order.createdAt.getMonth();
      monthlyRevenue[month].revenue += payment.amount;
    });

    return NextResponse.json({
      totalFoods,
      totalCategories,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
      topFoods: foods,
      monthlyRevenue,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Dashboard Error",
      },
      {
        status: 500,
      }
    );
  }
}