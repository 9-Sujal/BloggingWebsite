import { useBlog } from '@/context/blog';
import { motion,AnimatePresence } from 'framer-motion';

import React,{useEffect} from 'react'
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';





export default function TagList() {

     const {tagList, tags, searchTerm, selectedTags, setSelectedTags, tagDelete} = useBlog();
     const data = useSession();
     

     useEffect(()=>{
     tagList();
     },[tagList])

   
     const handleTagSelect = (tag: typeof tags[number]) =>{
      if(selectedTags.some((t)=> t._id === tag._id)){
         toast.error("tag is already selected")
         return;
      }
      // setting maxlimit
      if(selectedTags.length >= 5){
         toast.error("you can only select upto 5 tags"); 
         return; 
      }
      //add the tag to selected tags

      setSelectedTags([tag, ...selectedTags])

      localStorage.setItem(
        "selectedTags", 
        JSON.stringify([tag, ...selectedTags])
      )
     }

     const handleTagRemove = (tag: typeof tags[number]) =>{
      setSelectedTags(selectedTags.filter((t)=> t._id !== tag._id))
      localStorage.setItem(
        "selectedTags", 
        JSON.stringify(selectedTags.filter((t)=> t._id !== tag._id))
      )
     }

     useEffect(()=>{
        const raw = localStorage.getItem("selectedTags");
        const storedTags = raw ? JSON.parse(raw) : [];
        setSelectedTags(storedTags)
     },[setSelectedTags])
    
  
  return (
    <div className="space-y-6">
      {/* Selected Tags */}
      <div className="rounded-lg bg-indigo-300 p-4">
        <p className="text-sm text-zinc-600 text-center mb-3">
          {selectedTags.length === 0 ? "No tags selected" : "Selected tags"}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {selectedTags.map((tag) => (
              <motion.button
                key={tag._id}
                onClick={() => handleTagRemove(tag)}
                layout
           initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm px-4 py-1.5 rounded-full
                  bg-indigo-200 text-zinc-900
                  hover:bg-indigo-400 hover:text-white
                  transition"
              >
                {tag.name}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* All Tags */}
      <div>
        <h3 className="text-sm font-medium text-white/50 mb-3 text-center">
          All tags
        </h3>

        <div className=" p-2  flex flex-wrap justify-center gap-2 max-h-[200px] overflow-auto px-1">
          <AnimatePresence>
            {tags
              ?.filter((tag) =>
                tag?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
              )
              .map((tag) => {
                const isSelected = selectedTags.some(
                  (t) => t._id === tag._id
                );

                return (
                  <motion.div
                    key={tag._id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative group"
                  >
                    <button
                      onClick={() => handleTagSelect(tag)}
                      className={` border-2 text-sm px-3 py-1.5 rounded-full transition ${
                        isSelected
                          ? "bg-zinc-700 text-zinc-100"
                          : "bg-indigo-100 text-zinc-900 hover:bg-gray-100"
                      }`}
                    >
                      {tag.name}
                    </button>

                    {/* delete (author only) */}
                    {tag.postedBy === data?.data?.user?.id && (
                      <motion.span
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          tagDelete(tag._id);
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 text-[10px] border-2 bg-amber-300 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        ×
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div> )
}
