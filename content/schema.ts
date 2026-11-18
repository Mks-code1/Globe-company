import { z } from "zod";

/** Localized string. `ar` stays "" until the Arabic copy is written; UI falls back to `en`. */
export const localized = z.object({
  en: z.string().min(1),
  ar: z.string().default(""),
});
export type Localized = z.infer<typeof localized>;

export const CATEGORIES = ["steel", "concrete", "cladding", "aluminum"] as const;
export const category = z.enum(CATEGORIES);
export type Category = z.infer<typeof category>;

/**
 * Client / consultant / contractor. The old site only has logos (no company names),
 * so both fields are optional; at least one must be present. Never invent a name.
 */
const party = z
  .object({
    name: z.string().min(1).optional(),
    logo: z.string().min(1).optional(),
  })
  .refine((p) => p.name || p.logo, { message: "party needs a name or a logo" });

const scope = z.object({
  title: localized,
  durationMonths: z.number().positive().optional(),
  images: z.array(z.string().min(1)).default([]),
});

const video = z.object({
  src: z.string().min(1),
  poster: z.string().min(1).optional(),
});

/**
 * Required: slug, title, categories, scopes, cover.
 * Everything else is optional: if a value is absent the UI hides that row.
 */
export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: localized,
  categories: z.array(category).min(1),
  year: z.number().int().optional(),
  location: z.string().min(1).optional(),
  client: party.optional(),
  consultant: party.optional(),
  contractor: party.optional(),
  scopes: z.array(scope).min(1),
  cover: z.string().min(1),
  gallery: z.array(z.string().min(1)).default([]),
  videos: z.array(video).default([]),
});
export type Project = z.infer<typeof projectSchema>;

/** Certificates grouped by issuer. */
export const certificatesSchema = z.object({
  groups: z.array(
    z.object({
      id: z.string().min(1),
      issuer: localized,
      items: z
        .array(
          z.object({
            src: z.string().min(1),
            alt: localized,
          }),
        )
        .min(1),
    }),
  ),
});
export type Certificates = z.infer<typeof certificatesSchema>;

/** Workflow diagram ("The Project Structure"). */
export const processSchema = z.object({
  owner: localized,
  stages: z.array(
    z.object({
      id: z.string().min(1),
      title: localized,
      steps: z.array(localized).min(1),
    }),
  ),
});
export type Process = z.infer<typeof processSchema>;

export const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  address: z.string(),
  poBox: z.string(),
  instagram: z.url(),
  copyright: z.string(),
  managers: z.array(
    z.object({
      name: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      email: z.email(),
      phone: z.string(),
      photo: z.string(),
    }),
  ),
});
export type Site = z.infer<typeof siteSchema>;
