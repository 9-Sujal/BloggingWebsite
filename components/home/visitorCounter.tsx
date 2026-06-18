"use client";

import { useEffect } from "react";

interface Props {
  initialCount: number;
}

export default function VisitorCounter({ initialCount }: Props) {
  useEffect(() => {
    // Fire-and-forget: increment count on every visit
    fetch("/api/visitors", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        // Update the static number rendered by the server with the fresh count
        const el = document.getElementById("visitor-display");
        if (el && data.count) {
          el.textContent = Number(data.count).toLocaleString();
        }
      })
      .catch(() => {});
  }, []);

  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-zinc-200 font-medium" suppressHydrationWarning>
        {initialCount.toLocaleString()}
      </span>{" "}
      visitors
    </span>
  );
}