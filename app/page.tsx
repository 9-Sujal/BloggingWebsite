// import BlogCard from "@/components/blog/View/blogCard";
// import Pagination from "@/components/blog/View/pagination";
// import { Blog } from "@/types/blog";


// export const metadata = {
//   title: "Reading list",
//   description: "Welcome to the reading list page where you can find all my blogs.",
// };

// async function getBlogs(page: number = 1) {
//   const res = await fetch(`${process.env.API}/blogs?page=${page}`, {
//     next: { revalidate: 60 },
  
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch blogs");
//   }

//   return res.json();
// }
// // async function getBlogs(page = 1) {
// //   const res = await fetch(`${process.env.API}/api/blogs?page=${page}`, {
   
// //     next: { revalidate: 60 },
// //   });

// //   if (!res.ok) {
// //     return [];
// //   }

// //   return res.json();
// // }

// export default async function Home({
//   searchParams,
// }: {
//   searchParams?: Promise<{ page?: string }>;
// }) {
//   const params = await searchParams;
//   const page = Number(params?.page) || 1;
//   const { blogs, totalPages } = await getBlogs(page);

//   return (
//     <main
//       className="
//         w-screen
//         border border-white/10
//         bg-zinc-900
//         backdrop-blur-2xl
//         shadow-[0_0_30px_rgba(0,0,0,0.2)]
//         transition-all
//         duration-500
//       "
//     >
//       <h1
//         className="text-4xl font-sans  mb-10 text-white justify-center flex mt-12
//           bg-clip-text ">
//        Blogs
//       </h1>

//       <div className="space-y-8">
//         {blogs?.map((blog: Blog) => (
//           <BlogCard key={blog._id} blog={blog} page="" />
//         ))}
//       </div>

//       <div className="mt-12">
//         <Pagination currentPage={page} totalPages={totalPages} />
//       </div>
//     </main>
//   );
// }


import BlogCard from "@/components/blog/View/blogCard";
import Pagination from "@/components/blog/View/pagination";
import VisitorCounter from "@/components/home/visitorCounter";

import { Blog } from "@/types/blog";

export const metadata = {
  title: "Sujal Ghorse — Blog",
  description: "Backend-focused full-stack developer writing about real projects, code, and things I learn along the way.",
};

function getApiBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getBlogs(page: number = 1) {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}/api/blogs?page=${page}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { blogs: [], totalPages: 1 };
    return res.json();
  } catch {
    return { blogs: [], totalPages: 1 };
  }
}

async function getVisitorCount(): Promise<number> {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}/api/visitors`, { cache: "no-store" });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    return 0;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const [{ blogs, totalPages }, visitorCount] = await Promise.all([
    getBlogs(page),
    getVisitorCount(),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-screen">

      {/* ── Hero ── */}
      <section className="text-center pt-8 pb-12 border-b border-white/10 mb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
          Personal blog
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 leading-tight">
          Sujal Ghorse
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          Full-stack developer. Writing about what i see,
          code, and things I learn along the way.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
            <span className="text-zinc-200 font-medium">{totalPages * 6}</span> posts
          </span>
          <span className="w-px h-4 bg-white/10" />
          {/* Live visitor counter — client component handles the POST + live update */}
          <VisitorCounter initialCount={visitorCount} />
        </div>

        {/* Visitor card */}
        <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Total visitors
          </div>
          <div
            id="visitor-display"
            className="text-4xl font-semibold text-white tabular-nums"
          >
            {visitorCount.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-600 mt-1">unique page views</p>
        </div>
      </section>

      {/* ── Blog list ── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-5">
          Latest posts
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <p className="text-base">No posts yet.</p>
            <p className="text-sm mt-1">Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog: Blog) => (
              <BlogCard key={blog._id} blog={blog} page="" />
            ))}
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}