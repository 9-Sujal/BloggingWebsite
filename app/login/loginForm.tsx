"use client";

import React,{ useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

import { Eye, EyeOff, UserPlus } from "lucide-react";



export default function LoginForm() {
     const [form, setForm] = useState({ email: "", password: "" });
    const [error,setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading,setLoading] = useState(false);
      const [visible, setVisible] = useState(false);

   //redirecting
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError(null);
        setLoading(true);


    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

        const res = await signIn("credentials",{
            redirect:false,
            email,
            password,
            callbackUrl:"/"
        });

        setLoading(false);

        if(res?.error){
            toast.error(res.error);

        }else if(res?.ok){
            toast.success("Logged in successfully");
            router.push( callbackUrl);
        }

    };
  return (
         <form onSubmit={handleSubmit} className="space-y-4 text-zinc-500">

          <div className=''>
            <label htmlFor="email" className="block text-sm font-medium text-shadow-zinc-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
             onChange={handleChange}
             placeholder='...'
              required
              className="w-full px-3 py-2 border rounded-lg mt-1 text-zinc-800"
            />
          </div>

          <div className="relative" >
           
                
                <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder='...'
              required
              className="w-full px-3 py-2 border rounded-lg mt-1 text-zinc-800"
            />
               <button
        type="button"
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        title={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/6 translate-x-1/4 h-9 w-9 flex items-center text-zinc-900 rounded focus:outline-none "
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
                
     </div>
          

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 border border-zinc-300 shadow-zinc-300 shadow-2xs text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
           <button 
        onClick={()=> signIn("google", {callbackUrl})} 
        className=' flex items-center justify-center gap-2 w-full bg-cyan-950 text-white py-2 hover:bg-cyan-800 shadow-cyan-400 shadow-2xs border rounded-lg border-cyan-300  transition'>
          Sign in with Google <UserPlus size={16}/>
        </button>

        <div className="mt-4 flex justify-between text-sm">
         
          <Link href="/register" className="text-zinc-600 hover:text-blue-500">
            Create Account
          </Link>
        </div>
        </form>

  )
}
