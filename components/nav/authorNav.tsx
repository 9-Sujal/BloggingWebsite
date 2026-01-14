"use client"
export const dynamic = 'force-dynamic';

import Link from 'next/link'
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';

export default function AuthorNav() {
  return (
     <nav className='relative  w-full bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 border-white shadow-sm'>
     <div className='max-w-7xl mb-5 mx-auto px-6 py-3 flex items-center justify-between '>
     
              <div className='flex items-center space-x-2'>
        <Link href="/" className=' text-xl flex text-gray-900 border-2 rounded-lg p-2 hover:bg-white hover:text-amber-600  ' >
        Author
       <FaPencilAlt className='size-6 hover:text-blue-400'/>
     
       
        </Link>

        <Link href="/blog/create" 
        className='text-xl flex text-gray-900 border-2 rounded-lg p-2 hover:bg-white hover:text-amber-600  '>
        write a blog
        </Link>

          <Link href="/" 
        className='text-xl flex text-gray-900 border-2 rounded-lg p-2 hover:bg-white hover:text-amber-600  '>
        myBlogs
        </Link>
        </div> 
               
        </div>
        </nav>
  )
}
