import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const hashed = scryptSync(password, salt, KEY_LENGTH);
  const stored = Buffer.from(hash, "hex");
  if (hashed.length !== stored.length) return false;
  return timingSafeEqual(hashed, stored);
}

export function validatePassword(password: string) {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}
