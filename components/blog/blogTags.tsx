"use client"
import React from 'react'
import TagForm from '../tags/TagForm'

import { useBlog } from '@/context/blog'

interface BlogFormProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export default function BlogTags({ onNextStep, onPrevStep }:BlogFormProps ) {
    const {selectedTags}=useBlog()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
         <div
        className="
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.7)]
          p-6 sm:p-8
        "
      >
         <h2 className="text-xl font-semibold text-zinc-100 mb-2">
          Choose Tags
        </h2>
          <p className="text-sm text-zinc-400 mb-6">
          Select at least one tag to help categorize your blog.
        </p>
        <TagForm/>

        </div>
      
           <div className="flex justify-between mt-6 ">
       <button onClick={onPrevStep}
         
         className="
            px-5 py-2.5
            rounded-lg
            border border-white/15
            bg-white/5
            text-zinc-300
            hover:bg-white/10
            transition
          ">
            prev
        </button>
        <button onClick={onNextStep}
         disabled={selectedTags?.length < 1}
         className="
            px-6 py-2.5
            rounded-lg
            bg-gradient-to-r from-blue-500/80 to-purple-500/80
            text-white
            font-medium
            hover:opacity-90
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
          ">
            next
        </button>
       
    </div>
    </div>
    
  )
}
