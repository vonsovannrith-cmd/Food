import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =======================
// GET SETTINGS
// =======================
export async function GET() {
  try {
    let setting = await prisma.setting.findFirst();

    // បង្កើត Default setting ប្រសិនបើមិនទាន់មានទិន្នន័យ
    if (!setting) {
      setting = await prisma.setting.create({
        data: {
          restaurant: "Mhob Khmer",
          logo: "",
          phone: "",
          email: "",
          address: "",
          currency: "USD",
          facebook: "",
          telegram: "",
        },
      });
    }

    return NextResponse.json(setting);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to load settings" },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE SETTINGS
// =======================
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // 1. រកមើល Record ដំបូង
    const existingSetting = await prisma.setting.findFirst();

    const dataToSave = {
      restaurant: body.restaurant ?? "Mhob Khmer",
      logo: body.logo ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      address: body.address ?? "",
      currency: body.currency ?? "USD",
      facebook: body.facebook ?? "",
      telegram: body.telegram ?? "",
    };

    let result;

    if (existingSetting) {
      // 2. ប្រសិនបើមាន ធ្វើការ Update
      result = await prisma.setting.update({
        where: {
          id: existingSetting.id,
        },
        data: dataToSave,
      });
    } else {
      // 3. ប្រសិនបើគ្មាន ធ្វើការ Create
      result = await prisma.setting.create({
        data: dataToSave,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}