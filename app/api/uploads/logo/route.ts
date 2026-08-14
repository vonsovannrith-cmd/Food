import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";


export async function POST(req: Request) {

  try {


    const formData = await req.formData();


    const file = formData.get("file") as File;



    if(!file){

      return NextResponse.json(
        {
          message:"No file uploaded"
        },
        {
          status:400
        }
      );

    }





    // Check image type

    if(!file.type.startsWith("image/")){

      return NextResponse.json(
        {
          message:"Only image files allowed"
        },
        {
          status:400
        }
      );

    }





    const bytes = await file.arrayBuffer();


    const buffer = Buffer.from(bytes);




    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/logo"
    );



    // create folder if not exist

    await mkdir(
      uploadDir,
      {
        recursive:true
      }
    );





    const ext = file.name.split(".").pop();


    const filename =
      `${randomUUID()}.${ext}`;





    const filepath =
      path.join(
        uploadDir,
        filename
      );




    await writeFile(
      filepath,
      buffer
    );





    const imageUrl =
      `/uploads/logo/${filename}`;





    return NextResponse.json({

      success:true,

      url:imageUrl

    });



  } catch(error){


    console.log(error);


    return NextResponse.json(
      {
        message:"Upload failed"
      },
      {
        status:500
      }
    );


  }

}