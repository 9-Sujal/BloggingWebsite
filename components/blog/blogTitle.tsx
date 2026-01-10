"use client"
import React from 'react'

import { useBlog } from '@/context/blog';



export default function BlogTitle({ onNextStep }: { onNextStep: () => void }) {
   
// context
const {title, setTitle} = useBlog();
   
 


  return (
    <div  className="
        max-w-2xl mx-auto mt-16
        rounded-2xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        shadow-[0_12px_40px_rgba(0,0,0,0.6)]
        p-6 sm:p-8
      ">
        
      <div className="mb-6">
         <label className="block text-sm text-zinc-400 mb-2">
          Blog title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title..."
          className="     w-full
            rounded-lg
            bg-zinc-900/80
            border border-white/10
            px-4 py-2.5
            text-zinc-100
            placeholder:text-zinc-500
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500/40
            transition"
        />
        
      </div>
    <div>
        <button onClick={onNextStep}
         disabled={!title?.trim()}
        className='    px-5 py-2.5
            rounded-lg
            text-sm font-medium
            bg-gradient-to-r from-blue-500/80 to-purple-500/80
            text-white
            transition
            hover:opacity-90
            disabled:opacity-40
            disabled:cursor-not-allowed'>
            next 
        </button>
    </div>
    </div>
  )
}
