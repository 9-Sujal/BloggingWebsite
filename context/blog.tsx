'use client'


import React,{createContext, useContext, useState, useEffect, useCallback} from 'react'
import toast from 'react-hot-toast'
import { FaCheckSquare } from 'react-icons/fa'
import { Blog } from '@/types/blog'


interface fourType{
  title:string
  markdown:string
  setTitle:React.Dispatch<React.SetStateAction<string>>
  setMarkdown:React.Dispatch<React.SetStateAction<string>>
  tagName: string
  setTagName: React.Dispatch<React.SetStateAction<string>>
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  tagCreate:(e:React.FormEvent<HTMLFormElement>) => void
  tagDelete:(id: string) => void;
  blogCreate:(e:React.MouseEvent<HTMLElement>)=>Promise<void>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  tagList: ()=> Promise<void>
  selectedTags: Tag[]
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
  featuredImage: string
  setFeaturedImage: React.Dispatch<React.SetStateAction<string>>
  imagePreview: string
  setImagePreview:  React.Dispatch<React.SetStateAction<string>>
  uploadImage: boolean
  setUploadImage:  React.Dispatch<React.SetStateAction<boolean>>
  handleNextStep: () => void;
  handlePrevStep: () => void;
  current: (n: number, condition?: unknown) => React.ReactNode; 
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchAuthorBlogs: (page?: number) => Promise<void>;
  blogUpdate?: (e: React.FormEvent) => Promise<void>;
 

  id?: string;
  setId?: React.Dispatch<React.SetStateAction<string>>;
  
}
interface UserRef {
  _id: string;
  name?: string;
  email?: string;
}

interface Tag {
  _id: string;
  name: string;
  slug: string;
  postedBy?: UserRef;
  createdAt?: string;
  updatedAt?: string;
}



const BlogContextInstance = createContext<fourType | undefined>(undefined);
export const BlogProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
        const [title, setTitle]= useState<string>("");
        const [markdown,setMarkdown] = useState<string>("")

          //tags
          const [tagName, setTagName] = useState<string>("");
          const [tags, setTags] = useState<Tag[]>([])
          const [selectedTags, setSelectedTags] = useState<Tag[]>([])
          // search
           const [searchTerm,setSearchTerm] = useState<string>("");
        //FEATURED IMAGE 
         const [featuredImage, setFeaturedImage] = useState("");
          const [imagePreview, setImagePreview] = useState("");
         const [uploadImage, setUploadImage] = useState(false)
        //multistep form
         const [step, setStep] = useState<number>(1);
        //  blogs
        const [blogs, setBlogs] = useState<Blog[]>([]);
        // pagination
        const [totalPages, setTotalPages] = useState<number>(1);
        const [page, setPage] = useState<number>(1);
        // blog update
        const [id, setId] = useState<string>("");


        const handleNextStep = ()=> setStep(step +1)
        const handlePrevStep = ()=>setStep(step-1)
        const current = (n: number, condition: unknown = true) =>
           (step >= n && Boolean(condition) ? <FaCheckSquare/> : null)

          useEffect(()=>{
            //loading the content from localstorage on component mount
            const savedTitle = localStorage.getItem('savedTitle')
            const savedMarkdown = localStorage.getItem('savedMarkdown');
        
            if(savedTitle && savedMarkdown){
              setTitle(savedTitle)
              setMarkdown(savedMarkdown)
               
            }
          },[])
           //save the content to local storage whenever it changes
           useEffect(()=>{
            localStorage.setItem("savedTitle", title);
            localStorage.setItem("savedMarkdown", markdown);
        
           },[title,markdown]);

            const tagCreate = async(e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if(!tagName.trim()){
              toast.error('Tag name cannot be empty')
              return
            }
              try{
               const response = await fetch(`${process.env.API}/crud/tag`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({name:tagName})
               })
               const data  = await response.json()


               if(!response.ok){
                
                toast.error(data?.err || 'Failed to create tag');
               }
               else{
               
                setTagName("")
                
                toast.success(`${data.tag?.name} tag is created`)
                await tagList();
               }


              }catch(err:any){
                console.log(err);
              }
          }

          const tagList = useCallback(async()=>{
            try{
              const response = await fetch(`${process.env.API}/tags`)
              const data  = await response.json();

              if(!response.ok){
                toast.error(data?.err)
              }else{
                setTags(data);
              }
            }catch(err){
              console.log(err);
            }
          },[]);

            const tagDelete = async (tagId: string) => {
              try{
                const response = await fetch(`${process.env.API}/crud/tag/${tagId}`,{
                  method:"DELETE"

                })
                const data =  await response.json();
                if(!response.ok){
                  toast.error(data?.error || data?.err || "Failed to delete tag");
                 return;
                }
                   setSelectedTags((prev) => prev.filter((tag) => tag._id !== tagId));
    setTags((prev) => prev.filter((tag) => tag._id !== tagId));

    setTagName("");
    
    toast.success(`${data.deletedTag?.name || "Tag"} deleted successfully`);
                
              }catch(err){
                console.log(err)
              }
            }
//Blog create  
   const blogCreate = async(e:React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            try{
              const response  = await fetch(`${process.env.API}/crud/Blog`,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                  title,
                  content: markdown,
                  tags:selectedTags?.map(tag => tag._id),
                  featuredImage,
                })
            })
              const data = await response.json();
              if(!response.ok){
                toast.error(data?.err || "Failed to create blog")
                return;
              }
                toast.success("Blog created successfully");
                setStep(1);
                localStorage.removeItem("savedTitle");
                localStorage.removeItem("savedMarkdown");
                localStorage.removeItem("featuredImage");
                localStorage.removeItem("imagePreview");
                localStorage.removeItem("selectedTags");
                setTitle("");
                setMarkdown("");
                setSelectedTags([]);
                setFeaturedImage("");
                setImagePreview("");
                setUploadImage(false);
                toast.success(`${data.blog?.title} created successfully`);
                
              
          }catch(err){
              console.log(err);
          }
    
        }

        const fetchAuthorBlogs = useCallback(async(page:number=1) => {
          try{

            const response = await fetch(`${process.env.API}/author/blogs?page=${page}`,
              
              {
                method:"GET",
                 headers: {
        "Accept": "application/json",
      },
              }
            );
            const data = await response.json();
            if(!response.ok){
              toast.error(data?.err || data?.error || "failed to fetch blogs");
               setBlogs([]);
      setTotalPages(0);
      setPage(page);
              return;
            }
   
    setBlogs(data.blogs);
    setTotalPages(data.totalPages);
    setPage(data.page);


          }catch(err){
            console.error("fetchAuthorBlogs error:", err);
    toast.error("Failed to fetch sujal author blogs" );
    
          }
        },[]);




// updateblog /..............................

  interface BlogUpdatePayload {
  title: string;
  content: string;
  tags: string[];
  featuredImage: string | null;
}

const blogUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload: BlogUpdatePayload = {
      title,
      content: markdown,
      tags: selectedTags?.map((tag) => tag._id),
      featuredImage,
    };

    const response = await fetch(`${process.env.API}/author/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: { err?: string } = await response.json();

    if (!response.ok) {
      toast.error(data?.err || "Something went wrong");
      return;
    }

    toast.success("Blog updated");

    setTitle("");
    setMarkdown("");
    setSelectedTags([]);
    setFeaturedImage("");
    setImagePreview("");
    setStep(1);

  } catch (err) {
    console.error("Update error:", err);
    toast.error("Failed to update blog");
  }
};




        
         const value:fourType = 
         { title, markdown, setTitle, setMarkdown,
           tagName,setTagName, tags, setTags,
            tagCreate ,blogCreate, tagList,
             searchTerm, setSearchTerm,
             selectedTags, setSelectedTags,
            featuredImage, setFeaturedImage,
          imagePreview, setImagePreview, uploadImage,setUploadImage,
        tagDelete,
      handleNextStep,handlePrevStep,current,
    step, setStep,
  blogs, setBlogs,
totalPages, setTotalPages,
page, setPage, fetchAuthorBlogs,
blogUpdate, 
 id, setId
};
 
    return (
        <BlogContextInstance.Provider value={value}>
          {children}
        </BlogContextInstance.Provider>
   
)
}

export const useBlog= ():fourType => {
    const context = useContext(BlogContextInstance)
    if(!context){
        throw new Error('useBlog must be used within a BlogProvider')
    }
    return context
}