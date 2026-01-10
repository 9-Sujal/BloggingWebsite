"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import LoginForm from "./loginForm";

export default function LoginShell() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div className="w-full max-w-md bg-white/70 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Login
        </h1>

      
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </motion.div>
    </motion.div>
  );
}
