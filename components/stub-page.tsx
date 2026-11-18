import { getTranslations } from "next-intl/server";

/** Temporary placeholder body for routes whose content arrives in later prompts. */
export async function StubPage({ title }: { title: string }) {
  const t = await getTranslations("pages");
  return (
    <main id="main" className="mx-auto max-w-(--container-max) px-(--gutter) py-(--section-y)">
      <h1 className="text-display font-bold text-fg">{title}</h1>
      <p className="mt-6 max-w-(--container-text) text-lead text-fg-muted">{t("stub")}</p>
    </main>
  );
}
