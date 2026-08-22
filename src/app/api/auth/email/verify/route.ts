import { NextResponse } from "next/server";
import { readOtpCookie, setSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { code?: string };
  const code = (body.code || "").replace(/\s/g, "");

  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the 6-digit code." }, { status: 400 });
  }

  const otp = await readOtpCookie();
  if (!otp || otp.code !== code) {
    return NextResponse.json({ error: "That code is invalid or expired." }, { status: 401 });
  }

  await setSessionCookie({
    id: `email:${otp.email}`,
    email: otp.email,
    name: otp.email.split("@")[0],
    provider: "email",
  });

  return NextResponse.json({ ok: true });
}
