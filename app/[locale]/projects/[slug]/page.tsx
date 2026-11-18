import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProject, getProjects } from "@/content/projects";
import { pick } from "@/content";
import { StubPage } from "@/components/stub-page";
import { requireLocale } from "@/i18n/params";
import { routing } from "@/i18n/routing";

// Project slugs come from static content: any slug that is not generated is an unmatched URL,
// which app/global-not-found.tsx renders as a proper server-rendered 404.
export const dynamicParams = false;

export function generateStaticParams() {
  // One entry per locale x project. Empty until content/projects/*.json exists.
  return routing.locales.flatMap((locale) =>
    getProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const locale = await requireLocale(params);
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: pick(project.title, locale) };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const locale = await requireLocale(params);
  const { slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "pages.project" });
  return <StubPage title={pick(project.title, locale) || t("title")} />;
}
