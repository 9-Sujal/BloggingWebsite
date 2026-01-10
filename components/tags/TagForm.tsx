"use client"
import React from 'react'
import { useBlog } from '@/context/blog';
import TagList from './TagList';
import toast from 'react-hot-toast';


export default function TagForm() {
// context
   const {tagName, setTagName,tags, selectedTags, setSelectedTags, tagCreate, searchTerm, setSearchTerm} = useBlog();


  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=> {
    if(e.key === "Enter"){
        e.preventDefault();
        const matchingTag = tags.find((t)=>
        t?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    
    )
    if(matchingTag){
        handleTagSelect(matchingTag);
        setSearchTerm("")
    }
    }

  };

  const handleTagSelect = (tag: typeof tags[number])=>{
     //check if the tag is already selected
     if(selectedTags.some((selectedTag)=> selectedTag._id === tag._id)){
         toast.error("Tag is already selected")
         return;
     }
     //check if the max limit of 5 tags is reached 
     if(selectedTags.length >= 5){
        toast.error("Maximum 5 tags are allowed")
        return;
     }
     //add the tag to selectedTags
     setSelectedTags([tag, ...selectedTags]);
     //save to local storage
     localStorage.setItem(
        "selectedTags", 
        JSON.stringify([tag, ...selectedTags])
     );
  }
   

  return (
    
     <div className="max-w-4xl mx-auto">
      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Filter tag */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Filter existing tags
          </label>
          <input
            type="search"
            placeholder="Search tags..."
            className="
              w-full rounded-xl px-5 py-3
              bg-zinc-900 text-gray-200
              border border-white/10
              focus:outline-none focus:ring-2 focus:ring-blue-500
              placeholder:text-gray-500
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        
        {/* Create tag */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Create a new tag
          </label>
          <form onSubmit={tagCreate}>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="New tag name"
              className="
                w-full rounded-xl px-5 py-3
                bg-zinc-900 text-gray-200
                border border-white/10
                focus:outline-none focus:ring-2 focus:ring-purple-500
                placeholder:text-gray-500
              "
            />
          </form>
        </div>
      </div>

      {/* Tag list */}
      <TagList />
    </div>
  );

}
