import certificatesData from "./certificates.json";
import processData from "./process.json";
import siteData from "./site.json";
import {
  certificatesSchema,
  processSchema,
  siteSchema,
  type Localized,
} from "./schema";

/** Validated at import time: bad content fails the build instead of reaching production. */
export const site = siteSchema.parse(siteData);
export const certificates = certificatesSchema.parse(certificatesData);
export const processFlow = processSchema.parse(processData);

/** Pick the copy for a locale; falls back to English while Arabic values are empty. */
export function pick(value: Localized, locale: string): string {
  return locale !== "en" && value[locale as "ar"]?.trim() ? value[locale as "ar"] : value.en;
}

export * from "./schema";
