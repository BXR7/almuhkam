import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const secretKey = process.env.JWT_SECRET || "aljalal_secret_key_2026_proofreading_platform_secure_token";
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only apply to /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("aljalal_admin_session")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // If user is trying to access /admin/login while authenticated, redirect to /admin
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // If user is trying to access protected /admin routes while unauthenticated, redirect to /admin/login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
