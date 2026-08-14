import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET ALL FOODS

export async function GET(){

  try{

    const foods = await prisma.food.findMany({

      include:{
        category:true
      },

      orderBy:{
        createdAt:"desc"
      }

    });


    return NextResponse.json(foods);


  }catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Failed to get foods"
      },
      {
        status:500
      }
    );

  }

}






// CREATE FOOD

export async function POST(
  req:Request
){

  try{


    const body =
      await req.json();



    const food =
    await prisma.food.create({

      data:{

        name:body.name,

        description:
        body.description,


        price:
        Number(body.price),


        image:
        body.image,


        stock:
        Number(body.stock),


        categoryId:
        Number(body.categoryId)

      }

    });



    return NextResponse.json(food);



  }catch(error){


    console.log(error);



    return NextResponse.json(
      {
        message:"Create food failed"
      },
      {
        status:500
      }
    );


  }

}