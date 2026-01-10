"use client"
import React from 'react'

import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

import 'highlight.js/styles/tomorrow-night-bright.css';
import "highlight.js/styles/github.css";
import { useBlog } from '@/context/blog';
import { imageUpload } from '@/lib/imageUpload';
import md from '@/lib/md';

interface BlogEditorFormProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}
export default function BlogEditorForm({ onNextStep, onPrevStep }: BlogEditorFormProps) {
   
// context
const { markdown, setMarkdown} = useBlog();
   
  
    // const md= new MarkdownIt({
    //     highlight:(str,lang)=>{
    //         const language = lang && hljs.getLanguage(lang) ? lang:"js";
            
    //         try{
    //             const highlightedCode = hljs.highlight(str,{language}).value;
    //             return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
    //         }
    //         catch(error){
    //             console.error(error)
    //             return "";
    //         }
    //     }
    // });
    
   


  return (
    <div  className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
      {/* <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border mx-4 py-1 w-1/2 sm:w-3/4 lg:w-1/2 items-center rounded"
        />
        
      </div> */}
  <div className='rounded-2xl
                 bg-white/5
                 border border-white/10
                 backdrop-blur-xl
                 shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                 overflow-hidden
                 '>

    
  
        <MdEditor
          value={markdown}
          style={{height:"88vh"}}
          className=" dark-editor text-zinc-100"
          renderHTML={(text) => md.render(text)}
          onChange={({text})=> setMarkdown(text)}
          onImageUpload={imageUpload}
        />
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
         disabled={!markdown?.trim()}
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
