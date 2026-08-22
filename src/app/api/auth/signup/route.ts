import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth/users";
import { validatePassword } from "@/lib/auth/password";
import { SESSION_COOKIE, SESSION_MAX_AGE, encodeSession, sessionCookieOptions } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  const name = body.name?.trim() || "";
  const email = body.email?.trim().toLowerCase() || "";
  const password = body.password || "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json({ error: passwordError }, { status: 400 });
  }

  try {
    const user = await createUser({ name, email, password });
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create account.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
