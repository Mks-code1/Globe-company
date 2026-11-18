import "server-only";
import fs from "node:fs";
import path from "node:path";
import { projectSchema, type Project } from "../schema";

const DIR = path.join(process.cwd(), "content", "projects");

let cache: Project[] | null = null;

/**
 * Loads every content/projects/*.json, validates it with zod (a malformed file fails the build
 * with the file name) and sorts: newest year first, projects without a year last, then by slug.
 */
export function getProjects(): Project[] {
  if (cache) return cache;

  const projects = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
      const parsed = projectSchema.safeParse(raw);
      if (!parsed.success) {
        throw new Error(`Invalid project file ${file}:\n${parsed.error.message}`);
      }
      if (`${parsed.data.slug}.json` !== file) {
        throw new Error(`Project file ${file} must be named after its slug "${parsed.data.slug}".`);
      }
      return parsed.data;
    });

  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate project slug "${p.slug}".`);
    slugs.add(p.slug);
  }

  projects.sort(
    (a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity) || a.slug.localeCompare(b.slug),
  );

  cache = projects;
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export type { Project };
