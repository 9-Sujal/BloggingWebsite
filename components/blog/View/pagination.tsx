"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Pagination({
  currentPage: page,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
   const pathname = usePathname();
    return(
          
      <nav className="flex justify-center mt-8 space-x-4">
       <ul className="inline-flex -space-x-px">
        {/* previous */}
        {page > 1 && (
          <li>
            <Link
              href={`${pathname}?page=${page - 1}`}

              className="px-3 py-2 border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 rounded-md"
            >
              Previous
            </Link>
          </li>
        )}
        {/* page numbers */}
        {Array.from({ length: totalPages }, 
        (_, index) => { 
          const p = index + 1;
          return (
            <li key={p}>
              <Link
                href={`${pathname}?page=${p}`}
                className={`px-3 py-2 border ${
                  p === page
                    ? "bg-gray-600 text-white border-gray-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } rounded-md`}
              >
                {p}
              </Link>

            </li>
          );
        }
         
        )}
        {page < totalPages  && (
          <li>
            <Link
              href={`${pathname}?page=${page + 1}`}
              className="px-3 py-2 border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 rounded-md"
            >
              Next
            </Link>
          </li>
        )}
       </ul>
      </nav> 
    )
}