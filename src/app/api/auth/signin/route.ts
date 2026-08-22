import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth/users";
import { SESSION_COOKIE, SESSION_MAX_AGE, encodeSession, sessionCookieOptions } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() || "";
  const password = body.password || "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE,
    encodeSession({
      id: user.id,
      email: user.email,
      name: user.name,
      provider: "password",
    }),
    sessionCookieOptions(SESSION_MAX_AGE)
  );
  return response;
}
