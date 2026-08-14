import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// GET ALL CATEGORIES

export async function GET(){


  try{


    const categories =
    await prisma.category.findMany({

      include:{

        _count:{

          select:{
            foods:true
          }

        }

      },

      orderBy:{
        createdAt:"desc"
      }

    });



    return NextResponse.json(categories);



  }
  catch(error){


    console.log(error);


    return NextResponse.json(

      {
        message:"Failed to get categories"
      },

      {
        status:500
      }

    );


  }


}







// CREATE CATEGORY

export async function POST(
req:Request
){


try{


const body =
await req.json();



const category =
await prisma.category.create({

data:{


name:
body.name,


image:
body.image || ""


}


});




return NextResponse.json(category);



}
catch(error){


console.log(error);



return NextResponse.json(

{
message:"Create category failed"
},

{
status:500
}

);


}



}