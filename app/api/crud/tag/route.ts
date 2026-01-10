import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/lib/dbConnect";
import slugify from 'slugify'
import { authOptions } from "@/lib/authOptions"; 
import { getServerSession } from "next-auth";


export async function POST(req: Request){
    await dbConnect();

    const {name} = await req.json();
    const slug = slugify(name, {lower:true});
   
    const session= await getServerSession(authOptions);
  
     const postedBy = session?.user?.id;
      if (!postedBy) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

    try{
        const existingTag = await Tag.findOne({slug});
        if(existingTag){
            return NextResponse.json(
                {err:`Tag "${name}" already exists `}, {status:400}
            )
        }

        const tag = await Tag.create({name,slug, postedBy});

        return NextResponse.json(
      { message: "Tag created successfully", tag },
      { status: 201 }
    );
    }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){
        
       return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
    }
}

