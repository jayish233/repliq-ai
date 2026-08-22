import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { googleAuthUrl, googleConfigured } from "@/lib/auth/google";
import {
  OAUTH_STATE_COOKIE,
  appUrl,
  encodeOAuthState,
  sessionCookieOptions,
} from "@/lib/auth/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") || "/dashboard";
  const origin = appUrl();

  if (!googleConfigured()) {
    return NextResponse.redirect(`${origin}/signin?error=config&next=${encodeURIComponent(next)}`);
  }

  const state = randomBytes(16).toString("hex");
  const response = NextResponse.redirect(googleAuthUrl(state));
  response.cookies.set(
    OAUTH_STATE_COOKIE,
    encodeOAuthState(state, next.startsWith("/") ? next : "/dashboard"),
    sessionCookieOptions(10 * 60)
  );
  return response;
}
