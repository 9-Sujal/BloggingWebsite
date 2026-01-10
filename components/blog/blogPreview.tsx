"use client";
import { useBlog } from "@/context/blog";
import md from "@/lib/md";
import Image from "next/image";
import React from "react";
import "highlight.js/styles/github.css"; 
import {useSession} from 'next-auth/react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogPreview({ blog }: { blog?: any }) {
  const { title, markdown, featuredImage } = useBlog();
  const {data:session} = useSession();
  return (
   
       <article
      className="
        max-w-3xl mx-auto
        rounded-2xl
        bg-zinc-900/80
        border border-white/10
        backdrop-blur-xl
        shadow-[0_30px_80px_rgba(0,0,0,0.8)]
        px-6 sm:px-10 py-8
      "
    >
      
      {/* Title */}
       <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-3">
        {title || "Untitled Blog"}
      </h1>
     
      
       <p className="text-sm text-zinc-400 mb-6">
        Published{" "}
        {blog?.createdAt
          ? dayjs(blog.createdAt).format("MMMM D, YYYY")
          : "just now"}{" "}
        · by{" "}
        <span className="text-blue-400">
          {session?.user?.name || "Unknown Author"}
        </span>
      </p>
            {/* Featured image at the end (small & elegant) */}
      {featuredImage && (
      
          <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden border border-white/10">
            <Image
              src={featuredImage}
              alt="Featured"
              fill
              priority
              className="object-cover"
            />
          </div>
        
      )}

      {/* Markdown Body */}
<article
  className="markdown-body max-w-none"
  dangerouslySetInnerHTML={{ __html: md.render(markdown || "") }}
/>



    </article>
  );
}
