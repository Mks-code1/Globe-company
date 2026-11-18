import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always", // /en/... and /ar/...
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: readonly Locale[] = ["ar"];
export const dirOf = (locale: Locale) => (RTL_LOCALES.includes(locale) ? "rtl" : "ltr");
