import Blog from "@/models/blog";
import dbConnect from "@/lib/dbConnect";

export async function getBlogBySlug(slug: string) {
  await dbConnect();

  const blog = await Blog.findOne({ slug })
    .populate("tags", "name slug")
    .populate("postedBy", "name username")
    .lean();

  return blog;
}
