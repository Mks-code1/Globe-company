import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../messages/en.json";

type Messages = { [key: string]: string | Messages };

/**
 * Arabic values are empty strings for now: any empty (or missing) value falls back to English,
 * key by key, so a half-translated file never renders a blank string.
 */
function withFallback(base: Messages, override: Messages): Messages {
  const out: Messages = {};
  for (const key of Object.keys(base)) {
    const b = base[key];
    const o = override?.[key];
    if (typeof b === "string") {
      out[key] = typeof o === "string" && o.trim() !== "" ? o : b;
    } else {
      out[key] = withFallback(b, typeof o === "object" && o !== null ? o : {});
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages =
    locale === "en"
      ? (en as Messages)
      : withFallback(en as Messages, (await import(`../messages/${locale}.json`)).default as Messages);

  return { locale, messages };
});
