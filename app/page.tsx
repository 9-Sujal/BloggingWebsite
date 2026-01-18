import BlogCard from "@/components/blog/View/blogCard";
import Pagination from "@/components/blog/View/pagination";
import { Blog } from "@/types/blog";


export const metadata = {
  title: "Reading list",
  description: "Welcome to the reading list page where you can find all my blogs.",
};

async function getBlogs(page: number = 1) {
  const res = await fetch(`${process.env.API}/blogs?page=${page}`, {
    next: { revalidate: 60 },
    cache:"no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}
// async function getBlogs(page = 1) {
//   const res = await fetch(`${process.env.API}/api/blogs?page=${page}`, {
   
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     return [];
//   }

//   return res.json();
// }

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { blogs, totalPages } = await getBlogs(page);

  return (
    <main
      className="
        w-screen
        border border-white/10
        bg-zinc-900
        backdrop-blur-2xl
        shadow-[0_0_30px_rgba(0,0,0,0.2)]
        transition-all
        duration-500
      "
    >
      <h1
        className="text-4xl font-sans  mb-10 text-white justify-center flex mt-12
          bg-clip-text ">
       Blogs
      </h1>

      <div className="space-y-8">
        {blogs?.map((blog: Blog) => (
          <BlogCard key={blog._id} blog={blog} page="" />
        ))}
      </div>

      <div className="mt-12">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
