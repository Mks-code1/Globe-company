import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

/** Awaits route params and returns a validated, typed locale (404 for anything else). */
export async function requireLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
