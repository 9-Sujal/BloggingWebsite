"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateLink = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex items-center space-x-2">
        {/* Previous */}
        {currentPage > 1 && (
          <li>
            <Link
              href={generateLink(currentPage - 1)}
              className="px-3 py-1 rounded-md border bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Previous
            </Link>
          </li>
        )}

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <li key={page}>
              <Link
                href={generateLink(page)}
                className={`px-2 py-1 rounded-md border transition ${
                  page === currentPage
                    ? "bg-zinc-600 text-white border-white"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {/* Next */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={generateLink(currentPage + 1)}
              className="px-3 py-1 rounded-md border bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
