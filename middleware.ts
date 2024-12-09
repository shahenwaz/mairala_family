import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("admin-auth")?.value === "true";

  if (!isAuthenticated && pathname.startsWith("/admin")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    const response = NextResponse.redirect(loginUrl);
    response.headers.set("Cache-Control", "no-store"); // Prevent caching
    return response;
  }

  if (isAuthenticated && pathname === "/login") {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    const response = NextResponse.redirect(adminUrl);
    response.headers.set("Cache-Control", "no-store"); // Prevent caching
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store"); // Prevent caching
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login"], // Apply middleware to admin and login paths
};
