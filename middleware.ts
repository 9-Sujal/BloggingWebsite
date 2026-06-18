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
    "/api/crud/:path*", 
    "/api/tags",       
    "/api/tags/:path*",   
    "/api/auth/:path*",   
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
          "Access-Control-Allow-Origin": "https://sujalblogs.onrender.com",
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
    response.headers.set("Access-Control-Allow-Origin","https://sujalblogs.onrender.com");
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
      const url = req.nextUrl.pathname;
      const method = req.method;

      // CRITICAL FIX: Explicitly allow public blog fetching paths to bypass NextAuth checks
      if (url.startsWith("/api/blog") && method === "GET") {
        return true;
      }
      
      // Allow options preflights and other non-dashboard api paths to bypass
      if (url.startsWith("/api/") || method === "OPTIONS") {
        return true;
      }
      
      // Keep your strict rule for user dashboards
      return !!token;
    }
  }
}
);
