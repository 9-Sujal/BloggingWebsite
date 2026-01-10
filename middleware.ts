import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// export default withAuth({
//   pages: {
//     signIn: "/login", // redirect guests to login page
//   },
// })

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*", "/api/admin/:path*" ,"/crud/:path*", "/blogs/create"], // protect all /dashboard routes
};

export default withAuth( async function middleware(req){
const url = req.nextUrl.pathname;
const userRole = req?.nextauth?.token?.role as string | undefined;
    
      if(url?.includes("dashboard/admin") && userRole !=='admin'){
        return NextResponse.redirect(new URL("/", req.url));
      } 
      if (url.startsWith("/dashboard/author") && userRole !== "author" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
       if (url.startsWith("/dashboard/user") && userRole !== "user" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }


    return NextResponse.next();
}, {
  callbacks:{
   authorized:({token}) =>{
    if(!token){
      return false
    }
    return true
   }
}});
 
    

