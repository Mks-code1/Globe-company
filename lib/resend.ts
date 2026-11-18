import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily created so builds and pages that never send mail don't need RESEND_API_KEY. */
export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set (see .env.example).");
  client ??= new Resend(key);
  return client;
}
