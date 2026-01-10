import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/lib/dbConnect"; 
import { currentUser } from "@/lib/helpers";
import slugify from "slugify";


export async function PUT(
  req: Request,
  {params}: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  const user = await currentUser();
  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json({ err: "Blog not found" }, { status: 404 });
  }

  if (blog.postedBy.toString() !== user?.id?.toString()) {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        ...body,
        slug: slugify(body.title || blog.title),
      },
      { new: true }
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;

  const user = await currentUser();
  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json({ err: "Blog not found" }, { status: 404 });
  }

  if (blog.postedBy.toString() !== user?.id?.toString()) {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await Blog.deleteOne({ _id: id });
    return NextResponse.json(deleted, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
