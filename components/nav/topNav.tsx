"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sigma, Share2, LogOut, LogIn,UserPlus } from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

type Role = "user" | "author" | "admin";

export default function TopNav() {
  const { data: session, status } = useSession();
  const role = (session?.user?.role as Role) || "user";

  const [connectOpen, setConnectOpen] = useState(false);
  const connectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!connectRef.current) return;
      const path =
        typeof e.composedPath === "function" ? e.composedPath() : [];
      if (path.includes(connectRef.current)) return;
      setConnectOpen(false);
    };

    document.addEventListener("pointerdown", handler, true);
    return () => document.removeEventListener("pointerdown", handler, true);
  }, []);

  /* ---------------- ROLE BASED LINKS ---------------- */

  const navLinks: Record<Role, { label: string; href: string }[]> = {
    user: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
    ],
    author: [
      { label: "Home", href: "/" },
      { label: "Write Blog", href: "/blog/create" },
      { label: "Portfolio", href: "https://myportfolio-qm36.vercel.app/" },
    ],
    admin: [
      { label: "Home", href: "/" },
      { label: "Admin Panel", href: "/dashboard/admin" },
      { label: "Reports", href: "/dashboard/admin/reports" },
    ],
  };

  return (
    <nav className="w-full bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Sigma size={34} />
          <span className="font-semibold text-lg">Sujal Blogs</span>
        </Link>

        {/* CENTER NAV (ROLE BASED) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks[role].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CONNECT DROPDOWN */}
          <div ref={connectRef} className="relative">
            <button
              onClick={() => setConnectOpen((s) => !s)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                         border border-zinc-700 text-zinc-300
                         hover:bg-zinc-800 hover:text-white transition"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Connect</span>
            </button>

            <AnimatePresence>
              {connectOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-zinc-900
                             border border-zinc-700 rounded-xl shadow-lg
                             overflow-hidden z-50"
                >
                  <li>
                    <a
                      href="https://myportfolio-qm36.vercel.app/"
                      target="_blank"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800"
                    >
                      <FaGlobe /> Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/9-Sujal"
                      target="_blank"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/sujal-ghorse-1255b0260/"
                      target="_blank"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

        {/* AUTH */}
{status === "authenticated" ? (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="text-zinc-400 hover:text-red-400 transition"
    aria-label="Logout"
  >
    <LogOut size={16} />
  </button>
) : (
  <div className="flex items-center gap-4">
    <Link
      href="/login"
      className="flex items-center gap-1 text-zinc-300 hover:text-white transition"
    >
      <LogIn size={16} />
      <span className="hidden sm:inline">Login</span>
    </Link>

    <Link
      href="/register"
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg
                 border border-zinc-600 text-zinc-300
                 hover:bg-zinc-800 hover:text-white transition"
    >
      <UserPlus size={16} />
      <span className="hidden sm:inline">Register</span>
    </Link>
  </div>
)}


          {/* PROFILE */}
          <Image
            src="/working.png"
            alt="profile"
            width={38}
            height={38}
            className="rounded-full border border-indigo-400"
          />
        </div>
      </div>
    </nav>
  );
}
