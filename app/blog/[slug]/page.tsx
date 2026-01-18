
import Image from "next/image";
import md from "@/lib/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Blog } from "@/types/blog";
import { getBaseUrl } from "@/lib/getBaseUrl";


dayjs.extend(relativeTime);

// -------------- FETCH FOR PAGE (relative OK) ------------------
async function getBlog(slug: string): Promise<Blog | null> {

  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/blog/${slug}`, {
      method: "GET",
      cache: "no-store",
    });

    const text = await res.text();

    if (text.startsWith("<!DOCTYPE")) {
      console.error("API returned HTML");
      return null;
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return null;
  }
}

// -------------- FETCH FOR METADATA (ABSOLUTE REQUIRED) --------
async function getBlogForMeta(slug: string): Promise<Blog | null> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${base}/api/blog/${slug}`, {
      method: "GET",
      cache: "no-store",
    });

    const text = await res.text();
    if (text.startsWith("<!DOCTYPE")) return null;

    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ---------------------- METADATA ------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // FIXED

  const blog = await getBlogForMeta(slug);

  return {
    title: blog?.title || "Blog",
    description: blog?.excerpt?.slice(0, 150) || "",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    openGraph: {
      images: [blog?.featuredImage || "/images/default.jpeg"],
    },
  };
}

// ----------------------- PAGE -------------------------------
export default async function BlogViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // FIXED

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center text-red-400 text-xl">
        Blog not found.
      </div>
    );
  }

  return (
    <div className=" mx-auto mt-10 md:mt-12 px-3 sm:px-4 lg:px-6 ">
      <div className="border-2 mx-auto w-full relative max-w-2xl aspect-video rounded-xl md:rounded-xl overflow-hidden">
        <Image
          src={blog.featuredImage || "/images/default.jpeg"}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw,768px"
               
          quality={90}
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 max-w-3xl mx-auto px-4 md:px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-zinc-100 mb-3">
          {blog.title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Published on{" "}
          <span className="text-blue-400">
            {dayjs(blog.createdAt).format("YYYY-MM-DD HH:mm A")}
          </span>{" "}
          by{" "}
          <span className="text-purple-300">
            {blog.postedBy?.name || "Sujal Ghorse"}
          </span>
        </p>

        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {blog.tags?.map((tag) =>
            typeof tag === "string" ? (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] sm:text-xs rounded-lg bg-white/5 border border-white/10 text-zinc-300 backdrop-blur-sm"
              >
                {tag}
              </span>
            ) : (
              <span
                key={tag._id}
                className="  px-2.5 py-1
              text-[11px] sm:text-xs
              rounded-lg
              bg-white/5
              border border-white/10
              text-zinc-300
              backdrop-blur-sm"
              >
                {tag.name}
              </span>
            )
          )}
        </div>

   <div className="markdown-body max-w-none">
  <div dangerouslySetInnerHTML={{ __html: md.render(blog.content) }} />
</div>
      </div>
    </div>
  );
}

