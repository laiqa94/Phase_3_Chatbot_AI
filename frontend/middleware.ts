import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "access_token";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (session) return NextResponse.next();

  const nextUrl = req.nextUrl.clone();
  nextUrl.pathname = "/login";
  nextUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(nextUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*"],
};
