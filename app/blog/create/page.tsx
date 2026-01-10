
"use client";

import { Suspense } from "react";
import BlogCreateClient from "./blogCreateClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading editor...</div>}>
      <BlogCreateClient />
    </Suspense>
  );
}
