import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Tag from "@/models/tag";
import { NextResponse } from "next/server";




export async function GET(req: Request, 
  {params}: { params: { slug: string } }) {
    await dbConnect();

    const { slug } = params;
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = 6;

  try{
    const tag = await Tag.findOne({slug});
    const skip = (page - 1) * pageSize;
    const totalBlogs=await Blog.countDocuments({tags:tag?._id});

    const blogs = await Blog.find({tags:tag?._id})
    .select("-content")
    .select("title excerpt slug featuredImage postedBy tags createdAt")
    .populate("postedBy", "name")
    .populate("tags", "name slug ")
    .sort({createdAt:-1})
    .skip(skip)
    .limit(pageSize);

    return NextResponse.json({
        blogs,
        totalPages: Math.ceil(totalBlogs/pageSize),
        tag, 
        page: Number(page),
    }, {status:200});
  }
    catch(err:unknown){
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        return NextResponse.json({err:errorMessage}, {status:500});
    }
}