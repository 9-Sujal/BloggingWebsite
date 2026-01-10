import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; 
import Blog from "@/models/blog"; 
import slugify from "slugify";
// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
import { createExcerpt, currentUser } from "@/lib/helpers";
import User from "@/models/user";

export async function POST(request: Request) {
  await dbConnect();
  const user = await currentUser();
  console.log("Session in blog create route:", user);
  const body = await request.json();
  console.log("Request body in blog create route:", body);
  try{
    const blog = await Blog.create({
        ...body,
        slug:slugify(body.title,{
                lower:true,
            strict:true,
        }),
        postedBy:{
          _id:user?.id,
          name:user?.name,
          email:user?.email,
        },
        
      
        excerpt:createExcerpt(body.content, 320),
    });

    // make user author
    await User.findOneAndUpdate(
      {_id:user?.id},
      {$push:{blogs:blog._id}},
      {$addToSet:{role:"author"}}
    );
    return NextResponse.json({blog},{status:201});



  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(err:any){

    return NextResponse.json({err:err.message}, {status:500});
  }
}
    

