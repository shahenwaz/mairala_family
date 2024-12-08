import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the value of the cookie
  const isAuthenticated = request.cookies.get("admin-auth")?.value === "true";
  const url = request.nextUrl.clone();

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated && url.pathname.startsWith("/admin")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"], // Apply middleware only to these routes
};
