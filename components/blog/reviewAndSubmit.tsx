import { useBlog } from "@/context/blog";
import React from "react";
import BlogPreview from "./blogPreview";

interface BlogFormProps {
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

export default function ReviewAndSubmit({
  onNextStep,
  onPrevStep,
}: BlogFormProps) {
  const { title, markdown, selectedTags, blogCreate } = useBlog();

  const isDisabled =
    !title?.trim() ||
    markdown?.trim().length < 60 ||
    selectedTags?.length < 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
      {/* Card */}
      <div
        className="
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,0.75)]
          p-6 sm:p-8
        "
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Review Your Blog
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Please review everything before publishing.
          </p>
        </div>

        {/* Preview */}
        <div
          className="
            rounded-xl
            border border-white/10
            bg-zinc-900/70
            p-4 sm:p-6
            max-h-[70vh]
            overflow-y-auto
            scrollbar-thin scrollbar-thumb-white/10
          "
        >
          <BlogPreview />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6 gap-4">
        {onPrevStep && (
          <button
            onClick={onPrevStep}
            className="
              flex-1 px-5 py-2.5 rounded-lg
              bg-white/5
              border border-white/15
              text-zinc-300
              hover:bg-white/10
              transition
            "
          >
            Previous
          </button>
        )}

        {onNextStep && (
          <button
            onClick={blogCreate}
            disabled={isDisabled}
            className="
              flex-1 px-6 py-2.5 rounded-lg
              bg-linear-to-r from-blue-500/80 to-purple-500/80
              text-white font-medium
              hover:opacity-90
              transition
              disabled:opacity-40
              
            "
          >
            Publish Blog 
          </button>
        )}
      </div>

      {/* Validation hint */}
      {isDisabled && (
        <p className="text-center text-xs text-zinc-400 mt-3">
          Make sure your title, content (60+ chars), and at least one tag are added.
        </p>
      )}
    </div>
  );
}
