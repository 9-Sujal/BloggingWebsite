// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server";

// // export default withAuth({
// //   pages: {
// //     signIn: "/login", // redirect guests to login page
// //   },
// // })

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*", "/api/admin/:path*" ,"/crud/:path*", "/blogs/create"], // protect all /dashboard routes
// };

// export default withAuth( async function middleware(req){
// const url = req.nextUrl.pathname;
// const userRole = req?.nextauth?.token?.role as string | undefined;
    
//       if(url?.includes("dashboard/admin") && userRole !=='admin'){
//         return NextResponse.redirect(new URL("/", req.url));
//       } 
//       if (url.startsWith("/dashboard/author") && userRole !== "author" && userRole !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//        if (url.startsWith("/dashboard/user") && userRole !== "user" && userRole !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }


//     return NextResponse.next();
// }, {
//   callbacks:{
//    authorized:({token}) =>{
//     if(!token){
//       return false
//     }
//     return true
//    }
// }});
 
    


import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// 1. Update the matcher config to include your CORS API targets
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/api/user/:path*", 
    "/api/admin/:path*", 
    "/api/crud/:path*",    // Added /api/ prefix to ensure it catches database requests
    "/api/auth/:path*",    // Added to catch external auth sync checks
    "/blogs/create"
  ], 
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.role as string | undefined;
    
    // --- START OF CORS HANDLING LOGIC ---
    // Handle the browser's hidden OPTIONS preflight request before anything else
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://onrender.com",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        },
      });
    }
    // --- END OF CORS HANDLING LOGIC ---

    // Your existing role-based routing checks
    if (url?.includes("dashboard/admin") && userRole !== 'admin') {
      return NextResponse.redirect(new URL("/", req.url));
    } 
    if (url.startsWith("/dashboard/author") && userRole !== "author" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (url.startsWith("/dashboard/user") && userRole !== "user" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Set standard CORS headers for valid subsequent requests (GET, POST, etc.)
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "https://onrender.com");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );

    return response;
  }, 
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // CRITICAL FIX: Allow cross-origin API calls and OPTIONS requests to skip 
        // the NextAuth login redirect wall, otherwise Render will get redirected to a login page html string!
        const url = req.nextUrl.pathname;
        if (url.startsWith("/api/") || req.method === "OPTIONS") {
          return true;
        }
        
        // Keep your original strict rule for regular admin dashboard UI views
        return !!token;
      }
    }
  }
);
