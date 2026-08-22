import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { AuthUser } from "./types";

export const SESSION_COOKIE = "repliq_session";
export const OTP_COOKIE = "repliq_otp";
export const OAUTH_STATE_COOKIE = "repliq_oauth_state";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const OTP_MAX_AGE = 60 * 10;

function secret() {
  return process.env.AUTH_SECRET || "repliq-dev-secret-change-me";
}

export function signPayload(data: object) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyPayload<T>(token: string | undefined | null): T | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as T & { exp?: number };
    if (parsed.exp && Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export function encodeSession(user: AuthUser) {
  return signPayload({ ...user, exp: Date.now() + SESSION_MAX_AGE * 1000 });
}

export async function setSessionCookie(user: AuthUser) {
  (await cookies()).set(SESSION_COOKIE, encodeSession(user), sessionCookieOptions(SESSION_MAX_AGE));
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(OTP_COOKIE);
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const data = verifyPayload<AuthUser & { exp?: number }>(token);
  if (!data?.email) return null;
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
    provider: data.provider,
  };
}

export async function setOtpCookie(email: string, code: string) {
  const token = signPayload({ email, code, exp: Date.now() + OTP_MAX_AGE * 1000 });
  (await cookies()).set(OTP_COOKIE, token, sessionCookieOptions(OTP_MAX_AGE));
}

export async function readOtpCookie() {
  const token = (await cookies()).get(OTP_COOKIE)?.value;
  return verifyPayload<{ email: string; code: string; exp?: number }>(token);
}

export function encodeOAuthState(state: string, next: string) {
  return signPayload({ state, next, exp: Date.now() + 10 * 60 * 1000 });
}

export async function readOAuthStateCookie() {
  const token = (await cookies()).get(OAUTH_STATE_COOKIE)?.value;
  return verifyPayload<{ state: string; next: string; exp?: number }>(token);
}

export function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
