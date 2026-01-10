"use client";

import BlogEditorForm from '@/components/blog/blogForm'
import FeaturedImage from '@/components/blog/featuredImage'
import { useBlog } from '@/context/blog'
import React, { useEffect } from 'react'
import BlogTitle from '@/components/blog/blogTitle'
import BlogTags from '@/components/blog/blogTags'
import ReviewAndSubmit from '@/components/blog/reviewAndSubmit'
import { useRouter, useSearchParams } from 'next/navigation'

export default function BlogCreateClient() {
  const { title, markdown, selectedTags, featuredImage, step, setStep, handleNextStep, handlePrevStep, current } = useBlog();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step.toString());
    router.replace(`/blog/create?${params.toString()}`);
  }, [router, searchParams, step]);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      setStep(parseInt(stepParam, 10));
    }
  }, [searchParams, setStep]);

  return (
   
   <div className="min-h-screen bg-zinc-900 px-4 sm:px-6 py-10">
      {/* Stepper */}
      <div className="max-w-6xl mx-auto mb-10">
        <div
          className="
            flex flex-wrap justify-center gap-3
            rounded-2xl
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            p-4
          "
        >
          {[
            { id: 1, label: "Title", valid: title?.trim() },
            { id: 2, label: "Content", valid: markdown?.trim().length > 60 },
            { id: 3, label: "Tags", valid: selectedTags?.length > 0 },
            { id: 4, label: "Image", valid: !!featuredImage },
            { id: 5, label: "Review" },
          ].map(({ id, label, valid }) => (
            <button
              key={id}
              onClick={() => setStep(id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                border transition
                ${
                  step === id
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : valid
                    ? "bg-white/10 border-white/20 text-zinc-200"
                    : "bg-white/5 border-white/10 text-zinc-400"
                }
              `}
            >
              {current(id, valid)}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-5xl mx-auto">
        {step === 1 && <BlogTitle onNextStep={handleNextStep} />}
        {step === 2 && (
          <BlogEditorForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )}
        {step === 3 && (
          <BlogTags
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )}
        {step === 4 && (
          <FeaturedImage
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )}
        {step === 5 && (
          <ReviewAndSubmit
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )}
      </div>
    </div>
  );
}
