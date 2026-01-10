import { NextResponse } from "next/server"; 
import Blog from "@/models/blog"; 
import dbConnect from "@/lib/dbConnect"; 
import { currentUser } from "@/lib/helpers"; 

export async function GET(request: Request){ 
    await dbConnect();
     const url = new URL(request.url); 
     const page = parseInt(url.searchParams.get("page") || "1", 10);
     const pageSize = 6; 
     const user = await currentUser(); 
    
      try{ 
        const skip = (page-1)*pageSize; 
        const totalBlogs = await Blog.countDocuments({postedBy:user?.id}); 

        const blogs = await Blog.find({postedBy:user?.id})
         .select("-content")
         .select("title excerpt slug featuredImage postedBy tags createdAt")
         .populate("postedBy", "name")
         .populate("tags", "name slug")
         .sort({createdAt:-1})
         .skip(skip) 
         .limit(pageSize);
      
               
         return NextResponse.json({
                  blogs,
                  page: Number(page), 
                  totalPages: Math.ceil(totalBlogs/pageSize), 
                     }, {status:200});
            
 }catch(err:any)
             { 
                return NextResponse.json({err:err.message}, {status:500}

                ); 
            }}