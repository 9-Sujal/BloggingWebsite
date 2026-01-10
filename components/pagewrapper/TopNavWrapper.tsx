"use client"
export const dynamic = 'force-dynamic';

import { usePathname } from "next/navigation";
import TopNav from "../nav/topNav";

export default function TopNavWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/admin")) return null; 
  else   if (pathname.startsWith("/dashboard/author")) return null;// hide TopNav for admin
  return <TopNav />;
}