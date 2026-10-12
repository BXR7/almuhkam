import { NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "./lib/token";

// Routing optimization only. Every protected page and action authorizes on the server.
export async function proxy(request) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !await verifySession(token)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
