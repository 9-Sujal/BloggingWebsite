"use client"; 
export const dynamic = 'force-dynamic';
import DotLoader from "@/components/pagewrapper/DotLoader";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast/headless";
import { motion } from "framer-motion";

interface FormError {
  field?: "username" | "email" | "password" | "general";
  message: string;
}

export default function Register(){
    const [form,setForm] = useState({
     username:'',
        email:'',
        password:'',
    });
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<FormError | null>(null);
    const [success,setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>)=>{
           setForm({...form,[e.target.name]:e.target.value});
        };

        const handleSubmit = async(e:React.FormEvent)=>{
          
            e.preventDefault();
            setLoading(true);
            setError(null);
            setSuccess(null);

            
            try{
                const res=await fetch('/api/register',{

                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(form),
                });
                const data = await res.json();

                if(!res.ok){
                   toast.error(data.error || "Registration failed");
                    throw new Error(data.error || 'Registration failed');
                }
                else{
                  toast.success(data.success || "Registered successfully");
                  router.push("/login")
                }
                setSuccess("Registration successful! You can now log in.");
                setForm({username:'', email:'', password:''});
            }catch(err:unknown){
                 if (typeof err === "object" && err !== null && "message" in err) {
        const formErr = err as FormError;
        setError(formErr);
      } else if (err instanceof Error) {
        setError({ field: "general", message: err.message });
      } else {
        setError({ field: "general", message: "Unexpected error occurred" });
      }
    } finally {
      setLoading(false);
      toast.error(error?.message || "Failed to register" );
    }
        }

  
    
    return(
        <motion.div 
        initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
             className="min-h-screen flex items-center justify-center bg-transparent-t bg-gradient-to-br fro-sky-50 vi-green-100 to-green-200 shadow-md px-4 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
            <motion.div 
             initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            className="backdrop-blur-md w-full max-w-md bg-white/30 border-white/20 shadow-xl rounded-2xl p-6">

               <h1 className="text-2xl font-sans text-zinc-900 mb-6 text-center">Create your Account</h1> 
                 {loading ? (
          <DotLoader/>

        ) : (
           <form 
           onSubmit={handleSubmit}
           className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-800">Username</label>
                <input type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                minLength={3}
                className="mt-1 w-full px-3 py-2 bg-white/70 border border-gray-300 text-black font-medium text-2xl rounded-lg shadow-sm focus:ring focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 sm:text-sm"/>
             {error?.field === "username" && (
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            )}
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-800">Email</label>
                <input type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 bg-white/70 border border-gray-300 text-black font-medium text-2xl rounded-lg shadow-sm focus:ring focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 sm:text-sm"/>
                {error?.field === "email" && (
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            )}
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-800">Password</label>
                <input type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={5}
                className="mt-1 w-full px-3 py-2 bg-white/70 border border-gray-300 rounded-lg  text-black font-medium text-2xl shadow-sm focus:ring focus:ring-emerald-500 focus:ring-opacity-50 focus:border-emerald-500 sm:text-sm"/>
            {error?.field === "password" && (
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            )}
            </div>
            
            {/* error and success */}
            {error?.field==="general" && <p className="text-sm text-red-500">{error.message}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}

            <button
               type="submit"
               disabled={loading}
               className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded- lg-sm text-sm font-medium text-white bg-zinc-700 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition">
                {loading ? "Registering..." : "Register"}
               </button>

           </form>
        )}
          
            </motion.div>

        </motion.div>
    )
}