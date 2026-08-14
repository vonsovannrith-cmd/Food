import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
req:Request,
context:{
params:Promise<{id:string}>
}
){

const {id}=await context.params;


const category =
await prisma.category.findUnique({

where:{
id:Number(id)
}

});


return NextResponse.json(category);

}

// UPDATE

export async function PUT(

req:Request,

context:{
params:Promise<{id:string}>
}

){


try{


const {id}=await context.params;


const body =
await req.json();



const category =
await prisma.category.update({

where:{
id:Number(id)
},


data:{


name:
body.name,


image:
body.image


}


});



return NextResponse.json(category);



}
catch(error){


console.log(error);



return NextResponse.json(

{
message:"Update failed"
},

{
status:500
}

);


}


}







// DELETE

export async function DELETE(

req:Request,

context:{
params:Promise<{id:string}>
}

){



try{


const {id}=await context.params;




await prisma.category.delete({

where:{
id:Number(id)
}

});





return NextResponse.json({

message:"Category deleted"

});




}
catch(error){


console.log(error);



return NextResponse.json(

{
message:"Delete failed"
},

{
status:500
}

);


}


}