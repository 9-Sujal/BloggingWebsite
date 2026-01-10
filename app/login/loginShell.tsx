"use client";

import { motion } from 'framer-motion';
import LoginForm from './loginForm';

export default function LoginShell() {
  return (
     <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-transparent-t bg-gradient-to-br fro-sky-50 vi-green-100 to-green-200 px-6">
      <motion.div 
      initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-white/70 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-zinc-900 text-shadow-zinc-500 mb-4 text-center">Login</h1>

        
         <LoginForm/>
        
        </motion.div>
    </motion.div>
     
  );
}