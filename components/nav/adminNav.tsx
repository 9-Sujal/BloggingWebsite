"use client"
import { WandSparklesIcon, Wrench } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AdminNav() {
  return (
     <nav className='relative  w-full bg-gradient-to-r from-sky-100 via-blue-100 to indigo-100 border-indigo-300 shadow-sm'>
     <div className='max-w-7xl mb-5 mx-auto px-6 py-3 flex items-center justify-between '>
     
              <div className='flex items-center space-x-2'>
        <Link href="/" className=' text-xl flex text-gray-900 border-2 rounded-lg p-2 hover:bg-white hover:text-amber-600  ' >
        Admin
       <Wrench className='size-10 hover:text-blue-400'/>
       <WandSparklesIcon className='size-4 hover:text-green-600 ' />
       
        </Link>
        </div> 
               
        </div>
        </nav>
  )
}
