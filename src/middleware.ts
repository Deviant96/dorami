import NextAuth from "next-auth";
import { authConfig } from "@/app/auth.config";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// const { auth } = NextAuth(authConfig);

const authRoutes = ["/auth/login", "/auth/register"]

export default NextAuth(authConfig).auth;

// export default auth((req) => {
//   const isLoggedin = !!req.auth;
//   const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
//   const isApiAuthRouter = req.nextUrl.pathname.startsWith("/api/auth");
  
  

//   if (isApiAuthRouter) {
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedin) {
//       return Response.redirect(new URL("/auth/login", req.nextUrl));
//     }

//     return;
//   }
// });

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
};