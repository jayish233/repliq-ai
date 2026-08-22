import { NextResponse } from "next/server";
import { exchangeGoogleCode } from "@/lib/auth/google";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  appUrl,
  encodeSession,
  readOAuthStateCookie,
  sessionCookieOptions,
} from "@/lib/auth/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const origin = appUrl();

  if (error || !code || !state) {
    return NextResponse.redirect(`${origin}/signin?error=google`);
  }

  const stored = await readOAuthStateCookie();
  if (!stored || stored.state !== state) {
    return NextResponse.redirect(`${origin}/signin?error=state`);
  }

  try {
    const profile = await exchangeGoogleCode(code);
    const next = stored.next || "/dashboard";
    const response = NextResponse.redirect(`${origin}${next}`);
    response.cookies.set(
      SESSION_COOKIE,
      encodeSession({
        id: profile.sub,
        email: profile.email,
        name: profile.name || profile.email.split("@")[0],
        picture: profile.picture,
        provider: "google",
      }),
      sessionCookieOptions(SESSION_MAX_AGE)
    );
    return response;
  } catch {
    return NextResponse.redirect(`${origin}/signin?error=google`);
  }
}
