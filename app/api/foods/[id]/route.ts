import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const foodId = Number(resolvedParams.id);

    if (isNaN(foodId)) {
      return NextResponse.json({ message: "Invalid food ID" }, { status: 400 });
    }

    const food = await prisma.food.findUnique({
      where: { id: foodId },
      include: {
        category: true,
      },
    });

    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    return NextResponse.json(food, { status: 200 });
  } catch (error) {
    console.error("Fetch food detail error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const foodId = Number(resolvedParams.id);

    if (isNaN(foodId)) {
      return NextResponse.json({ message: "Invalid food ID" }, { status: 400 });
    }

    const body = await req.json();

    const updatedFood = await prisma.food.update({
      where: { id: foodId },
      data: {
        name: body.name,
        nameKm: body.nameKm,                 // បន្ថែមការអាប់ដេតឈ្មោះខ្មែរ
        description: body.description,
        descriptionKm: body.descriptionKm,     // បន្ថែមការអាប់ដេតការពិពណ៌នាខ្មែរ
        image: body.image,
        imageSecondary: body.imageSecondary,
        imageTertiary: body.imageTertiary,
        price: body.price ? parseFloat(body.price) : undefined,
      },
    });

    return NextResponse.json(updatedFood, { status: 200 });
  } catch (error) {
    console.error("Update food error:", error);
    return NextResponse.json({ message: "Failed to update food item" }, { status: 500 });
  }
}