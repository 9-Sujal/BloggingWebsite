import React from "react";
import Link from "next/link";
import "highlight.js/styles/github.css";
import { Blog, Tag } from "@/types/blog";
import Image from "next/image";

interface BlogCardProps {
  blog: Blog;
  page?: number | string;
}

export default function BlogCard({ blog, page }: BlogCardProps) {
  return (
    <div
      className="
        border border-white/10 
        bg-white/5 
        backdrop-blur-xl 
        rounded-2xl 
        duration-500 
        max-w-[640px] 
        mx-auto
      
        overflow-hidden 
        group
      "
    >
      {blog.featuredImage && (
        <div className="px-4 pt-4">
       <div className="relative aspect-[16/9] w-full rounded-xl">
  <Image
    src={blog.featuredImage}
    alt={blog.title}
    fill
    className="object-fill transition-transform duration-700 rounded-t-2xl"
    sizes="(max-width: 720px) 100vw, 50vw"
    quality={90}
  />
</div>
</div>
      )}

      <div className="p-2 space-y-2">
        {/* Title */}
        <h2
          className="
           
            text-xl 
            font-semibold 
            text-gray-100 
            mb-2
            tracking-wide 
            group-hover:text-gray-400 
            transition-colors 
            duration-300
          "
        >
          <Link href={`${page}/blog/${blog?.slug}`}>{blog.title}</Link>
        </h2>

        {/* Excerpt */}
        <div
          className="
         
            text-gray-400 
            text-sm
            leading-relaxed 
            line-clamp-1
            tracking-tight
          "
          dangerouslySetInnerHTML={
            blog.excerpt ? { __html: blog.excerpt } : { __html: "" }
          }
        />

        {/* Footer */}
        <div className=" flex flex-wrap items-center justify-between  gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-200">
              {blog?.postedBy?.email || "Sujal Ghorse"}
            </span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {(blog.tags as Tag[]).map((tag) => (
              <span
                key={tag._id}
                className="
                  px-3
                  py-1
                  text-[11px] 
                  bg-gray-500/10 
                  text-white
                  border 
                  border-gray-500/30 
                  rounded-lg 
                 shadow-[0_0_12px_rgba(0,0,0,0.3)]
backdrop-blur-md
                "
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//    // shadow-[0_0_20px_rgba(0,0,0,0.15)]
        // hover:shadow-[0_0_35px_rgba(0,0,0,0.25)]
        // hover:-translate-y-1 
        // transition-all 