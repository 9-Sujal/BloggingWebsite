import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const { slug } = await context.params;

  try {
    const blog = await Blog.findOne({slug})
      .populate("tags", "name slug")
      .populate("postedBy", "name username");

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}