"use client"
export const dynamic = 'force-dynamic';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Sigma,LogIn,LogOut, UserPlus2, SparklesIcon, LucideUser, LogOutIcon} from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion';
import {useSession, signOut} from 'next-auth/react';
import {FaPen, FaPencilAlt} from 'react-icons/fa'; 



export default function TopNav() {
     

  const {data:session , status} = useSession();


  const [isLoggedIn,setIsLoggedIn] = useState(false); 
   
    useEffect(()=>{
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
    },[])

    const handleLoginClick = ()=>{
      if(isLoggedIn){
         localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          alert("Logged out successfully");
      }
      else{
        
        window.location.href = "/login";
      }
    }
  
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // close dropdown when clicking outside
  useEffect(()=>{
    const onPointerDown = (event:PointerEvent)=>{
      const element = dropdownRef.current;
      if(!element) return;
// Prefer composedPath (works with shadow DOM / portals). Fallback to event.target containment.
      const path: EventTarget[] =
        (typeof event.composedPath === "function" && event.composedPath()) || []
        // some browsers (older) expose 'path'
        
        

      
        // If wrapper element is anywhere in the event path, it was an inside click — keep open.
 if (path.includes(element)) return;
        // outside click:
        setProfileOpen(false);
        return;
      

  
      }
    
    document.addEventListener("pointerdown",onPointerDown, true);
    return()=>{
      document.removeEventListener("pointerdown", onPointerDown, true)
    };
  },[])
 const router = useRouter(); 

  // handle register
  const handleRegister = ()=>{
     
     setTimeout(()=>{
      router.push("/register");
     
     },1000); 

  }
  return (

    <nav className='relative  w-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 shadow-sm'>
     <div className='max-w-5xl mx-auto px-6 py-3 flex items-center justify-between '>
       <div className='flex items-center space-x-2'>
        <Link href="/" className=' text-xl flex text-white border-2 rounded-lg p-2 hover:bg-white hover:text-amber-600  ' >
       <Sigma className='size-10 hover:text-blue-400'/>
       <SparklesIcon className='size-4 hover:text-green-600 ' />
        
        </Link>
        
        </div> 

       {/* profile */}
       <div className='relative'>

       <div className='absolute right-16 justify-center flex items-center gap-4 p-2 truncate '>
        {status === "authenticated" ? (
          <div className='flex items-center space-x-8   '>
             
             {session?.user?.role === "author" ?(
               <div className='flex items-center truncate gap-2 '> 
                <Link href="/dashboard/author" aria-label='author' className=' relative flex items-center whitespace-nowrap min-w-0 truncate gap-2 hover:border-green-400 hover:underline-offset-auto rounded-lg '>
               
                <LucideUser className="text-cyan-900"
                size={16}/> <span className='whitespace-nowrap flex-1 min-w-0 truncate text-cyan-900 font-medium text-lg hover:text-cyan-950 hover:underline '> {session?.user?.name || session?.user?.email}  
                </span> <FaPen className='text-cyan-200' size={14} /> 
                 </Link>

              <Link className=' px-2 flex items-center gap-1 hover:underline text-white hover:text-gray-200' 
              href="/blog/create">
             Write a Blog <FaPencilAlt size={16}/> </Link>
         </div>
               ):(
                // "/dashboard/user" 
      <Link href="/" className='flex items-center gap-1 hover:border-green-400 hover:underline-offset-auto rounded-lg'>
               <LucideUser className="text-amber-200"
                size={16}/> <span className='whitespace-nowrap flex-1 min-w-0 truncate text-amber-200 font-medium text-lg hover:underline '> {session?.user?.name || session?.user?.email} </span>
              </Link>
               )}
              
              {status === "authenticated" && session?.user?.role==="admin" &&(
                  <Link href={"/dashboard/admin"} >
                    admin
                  </Link>
                )}
              

              <button className='flex items-center gap-1 hover:underline text-white hover:text-gray-400 ' 
              onClick={()=> signOut({callbackUrl:"/login"})}>
              <LogOutIcon size={16}/> Logout </button>
          </div>
        
          
        ): (
              
        <button onClick={handleLoginClick}   className='hover:text-green-300 '>
          <Link href={"/login"} className='flex items-center gap-2 hover:border-green-400 hover:underline-offset-auto rounded-lg '>
          {isLoggedIn? <> Logout <UserPlus2/> </>: <>Login  <LogIn/></>}
          </Link>
          
        </button>
        
      
        )}
        </div>
       
     
        
       



        <button
        aria-expanded= {profileOpen}
        aria-controls='profile-dropdown'
        onClick={()=>setProfileOpen((s)=>!s)}
        className='w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-300 hover:ring-amber-300 transition'>
           <Image 
           src="/user.png"
           alt='profile'
           width={40}
           height={40}
           className='bg-amber-300'/>
           
        </button>
        {/* dropdown */}
        {profileOpen && (
          <motion.ul 
           initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl shadow-lg border border-zinc-700 text-sm overflow-hidden z-50'>
            {/* <li>
              <Link href="/"
              className='flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-white'>
                <User size={16}/> Profile
              </Link>
            </li> */}
            <li>
             <button onClick = {handleRegister}
              className='flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-zinc-800 text-white cursor-pointer'>
              <UserPlus2 size={16} className='inline'/> Register
              </button> 
            </li>
            <li>
              <Link href="/"
               onClick={()=> signOut({callbackUrl:"/login"})}
              className='w-full flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 text-white'>
                <LogOut size={16}/> LogOut

              </Link>
            </li>
          </motion.ul>
        )}
        
       </div>
    
 </div>
     
  

    </nav>
  )
}
// <div className='relative'>
      //    <button 
      //    onClick={()=>setCartOpen(!cartOpen)}
      //     className='p-2 rounded-full hover:border-amber-200 hover:border-2 relative' >
      //      <svg xmlns="http://www.w3.org/2000/svg" 
      //      className='h-8 w-8 text-amber-200'
          
      //      viewBox="0 0 24 24" 
      //      fill="none" stroke="currentColor" 
      //      strokeWidth="1.5" strokeLinecap="round" 
      //      strokeLinejoin="round">
      //       <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
      //       <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
      //       </svg>
      //       {/* badge */}
          
      //    </button>
       
        
      // </div>