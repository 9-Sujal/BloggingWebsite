import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/lib/dbConnect";



export async function GET() {
    await dbConnect();

    try{
        const tags = await Tag.find({}).sort({ createdAt:-1})
       
        return NextResponse.json(tags, {status:200});
    }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){
        return NextResponse.json({err:err.message},{status:500})
    }
    
}