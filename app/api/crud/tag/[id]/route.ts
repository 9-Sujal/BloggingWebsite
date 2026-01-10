import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Tag from "@/models/tag";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function DELETE(req:Request, context: {params: Promise<{id:string}>}){  
    const {id} = await context.params;
    await dbConnect();

  const session = await getServerSession(authOptions); 
  try {
     const tag = await Tag.findById(id);  
     //check if the user has permission to delete the tag


     const isOwner = tag?.postedBy?.toString() === session?.user.id.toString();
    const isUser = session?.user.role !== "user";

    if (!isOwner && !isUser) {
      return NextResponse.json(
        { error: "You are not authorized to delete this tag." },
        { status: 403 }
      );
    }
     const blogsWithTag = await Tag.find({tags: id});
     if(blogsWithTag.length === 0){
       //delete tag
       const deletedTag = await Tag.findByIdAndDelete(id);
       return NextResponse.json({
         message: "Tag deleted successfully.",
         deletedTag,
       });
     }else{
      //do not delete tag
       return NextResponse.json(
        {error:"Tag is associated with existing blogs and cannot be deleted."},
        {status:400}
       )
     }

   
    
     
     
  } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error:any) {

     return NextResponse.json({error:error.message}, {status:500})
  }
} 