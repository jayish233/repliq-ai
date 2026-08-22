import { appUrl } from "./session";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleRedirectUri() {
  return `${appUrl()}/api/auth/google/callback`;
}

export function googleAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    access_type: "online",
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string) {
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirect_uri: googleRedirectUri(),
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${text}`);
  }

  const tokens = (await tokenRes.json()) as { access_token: string };
  const userRes = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userRes.ok) {
    throw new Error("Failed to load Google profile");
  }

  const profile = (await userRes.json()) as {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
  };

  return profile;
}
