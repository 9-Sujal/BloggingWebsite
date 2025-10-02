"use client";

export default function DotLoader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce"></span>
    </div>
  );
}