import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { setOtpCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const code = String(randomInt(100000, 1000000));
  await setOtpCookie(email, code);

  return NextResponse.json({
    ok: true,
    previewCode: process.env.NODE_ENV !== "production" ? code : undefined,
  });
}
