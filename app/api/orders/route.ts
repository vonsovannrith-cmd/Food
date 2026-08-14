import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, totalAmount, notes, items, method } = body; // 📥 បន្ថែម method ពី body

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "កន្ត្រកទំនិញរបស់អ្នកទទេ ឬទិន្នន័យមិនត្រឹមត្រូវ" },
        { status: 400 }
      );
    }

    // ពិនិត្យនិងទាញយក foodId ឱ្យបានត្រឹមត្រូវនិងធានាថាមានក្នុង Database
    const formattedItems = [];
    for (const item of items) {
      const foodId = Number(item.foodId || item.id);
      
      const foodExists = await prisma.food.findUnique({
        where: { id: foodId },
      });

      if (!foodExists) {
        return NextResponse.json(
          { message: `មុខម្ហូបដែលមាន ID ${foodId} មិនមានក្នុងប្រព័ន្ធទេ` },
          { status: 400 }
        );
      }

      formattedItems.push({
        foodId: foodExists.id,
        quantity: Number(item.quantity || 1),
        price: Number(item.price || foodExists.price),
      });
    }

    // បង្កើត Order និង Payment ចូល Database ព្រមគ្នា
    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        total: Number(totalAmount),
        note: notes || "",
        status: "PENDING",
        items: {
          create: formattedItems,
        },
        // 🔴 បន្ថែមផ្នែកនេះដើម្បីបង្កើត Payment ស្វ័យប្រវត្តិ
        payment: {
          create: {
            amount: Number(totalAmount),
            status: "PENDING",
            method: method || "CASH", // ប្រើប្រាស់ method ដែលផ្ញើមកពី frontend ឬកំណត់ជា CASH ស្វ័យប្រវត្តិ
          },
        },
      },
      include: {
        items: true,
        payment: true, // 🔗 ទាញយកข้อมูล payment មកជាមួយ
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error during checkout" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const orders = await prisma.order.findMany({
      where: userId ? { userId: Number(userId) } : {},
      include: {
        user: true,
        items: {
          include: {
            food: true,
          },
        },
        payment: true, // 📥 បន្ថែម payment ទីនេះផងបើត្រូវការទាញមើលក្នុង orders API
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Failed to get orders:", error);
    return NextResponse.json([], { status: 500 });
  }
}