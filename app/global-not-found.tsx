import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import en from "@/messages/en.json";

export const metadata: Metadata = {
  title: en.notFound.title,
  robots: { index: false, follow: false },
};

/**
 * Document-level 404 (no locale is known here, so it renders in English).
 * Must return a full <html> because it bypasses the [locale] layout.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" data-theme="dark" className={fontVariables}>
      <body>
        <main className="mx-auto max-w-(--container-max) px-(--gutter) py-(--section-y)">
          <h1 className="text-display font-bold text-fg">{en.notFound.title}</h1>
          <p className="mt-6 max-w-(--container-text) text-lead text-fg-muted">{en.notFound.body}</p>
          <Link href="/en" className="mt-10 inline-block bg-accent px-8 py-4 font-bold text-on-accent">
            {en.notFound.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
