import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/reconstruct", "/workspace"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get("repliq_session")?.value;
  if (session) return NextResponse.next();

  const signin = new URL("/signin", request.url);
  signin.searchParams.set("next", pathname);
  return NextResponse.redirect(signin);
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/reconstruct/:path*",
    "/workspace/:path*",
  ],
};
