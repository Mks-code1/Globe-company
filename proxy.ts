import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: `middleware` was renamed to `proxy`.
export const proxy = createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and anything with a file extension (public/ assets).
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
