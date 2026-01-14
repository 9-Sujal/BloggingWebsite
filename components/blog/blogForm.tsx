
"use client";

import React from "react";
import MarkdownEditor from "@uiw/react-md-editor";
import { commands } from "@uiw/react-md-editor";
import { useBlog } from "@/context/blog";
import { imageUpload } from "@/lib/imageUpload";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface BlogEditorFormProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export default function BlogEditorForm({
  onNextStep,
  onPrevStep,
}: BlogEditorFormProps) {
  const { markdown, setMarkdown } = useBlog();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div
        className="
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.7)]
          overflow-hidden
        "
      >
        <MarkdownEditor
          value={markdown}
          height={600}
          onChange={(val) => setMarkdown(val ?? "")}
          commands={[
            ...commands.getCommands(),
            {
              name: "upload-image",
              keyCommand: "upload-image",
              buttonProps: { "aria-label": "Upload image" },
              icon: <span>📷</span>,
              execute: async (_, api) => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";

                input.onchange = async () => {
                  if (!input.files?.length) return;

                  try {
                    const file = input.files[0];
                    const url = await imageUpload(file);
                    api.replaceSelection(`![](${url})`);
                  } catch {
                    // errors already handled in imageUpload
                  }
                };

                input.click();
              },
            },
          ]}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevStep}
          className="
            px-5 py-2.5
            rounded-lg
            border border-white/15
            bg-white/5
            text-zinc-300
            hover:bg-white/10
            transition
          "
        >
          Prev
        </button>

        <button
          onClick={onNextStep}
          disabled={!markdown?.trim()}
          className="
            px-6 py-2.5
            rounded-lg
            bg-linear-to-r from-blue-500/80 to-purple-500/80
            text-white
            font-medium
            hover:opacity-90
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}


// "use client";

 


// import MarkdownEditor from "@/components/editor/MarkdownEditor";
// import { commands } from "@uiw/react-md-editor";

// import { useBlog } from '@/context/blog';
// import { imageUpload } from '@/lib/imageUpload';


// interface BlogEditorFormProps {
//   onNextStep: () => void;
//   onPrevStep: () => void;
// }
// export default function BlogEditorForm({ onNextStep, onPrevStep }: BlogEditorFormProps) {
   
// // context
// const { markdown, setMarkdown} = useBlog();
   
//   return (
//     <div  className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
  
//   <div className='rounded-2xl
//                  bg-white/5
//                  border border-white/10
//                  backdrop-blur-xl
//                  shadow-[0_20px_60px_rgba(0,0,0,0.7)]
//                  overflow-hidden
//                  '>
// <MarkdownEditor
//   value={markdown}
//   height={600}
//   onChange={(val) => setMarkdown(val ?? "")}
//   commands={[
//     ...commands.getCommands(),
//     {
//       name: "upload-image",
//       keyCommand: "upload-image",
//       buttonProps: { "aria-label": "Upload image" },
//       icon: <span>📷</span>,
//       execute: async (_, api) => {
//         const url = await imageUpload();
//         api.replaceSelection(`![](${url})`);
//       },
//     },
//   ]}
// />
//     {/* <MdEditor
//           value={markdown}
//           style={{height:"88vh"}}
//           className=" dark-editor text-zinc-100"
//           renderHTML={(text) => md.render(text)}
//           onChange={({text})=> setMarkdown(text)}
//           onImageUpload={imageUpload}
//         /> */}
// </div>
//      <div className="flex justify-between mt-6 ">
//        <button onClick={onPrevStep}
         
//            className="
//             px-5 py-2.5
//             rounded-lg
//             border border-white/15
//             bg-white/5
//             text-zinc-300
//             hover:bg-white/10
//             transition
//           ">
//             prev
//         </button>
//         <button onClick={onNextStep}
//          disabled={!markdown?.trim()}
//          className="
//             px-6 py-2.5
//             rounded-lg
//             bg-linear-to-r from-blue-500/80 to-purple-500/80
//             text-white
//             font-medium
//             hover:opacity-90
//             transition
//             disabled:opacity-40
//             disabled:cursor-not-allowed
//           ">
//             next
//         </button>
       
//     </div>
//     </div>
//   )
// }
