import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const pageSize = 6;


    try{
        const skip = (Number(page) - 1) * pageSize;
        const totalBlogs = await Blog.countDocuments({});
        const blogs = await Blog.find({})
        .select('-content')
        .populate('tags', '_id name slug')
        .populate('postedBy', 'name')
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 });
        return NextResponse.json(
            {blogs, 
            currentPage: Number(page), 
            totalPages: Math.ceil(totalBlogs / pageSize) },
            { status: 200 });

    }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err: any){
        return NextResponse.json({ err: err.message}, { status: 500 });
    }
}


