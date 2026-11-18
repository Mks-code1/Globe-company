import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main id="main" className="mx-auto max-w-(--container-max) px-(--gutter) py-(--section-y)">
      <h1 className="text-display font-bold text-fg">{t("title")}</h1>
      <p className="mt-6 max-w-(--container-text) text-lead text-fg-muted">{t("body")}</p>
      <Link href="/" className="mt-10 inline-block bg-accent px-8 py-4 font-bold text-on-accent">
        {t("back")}
      </Link>
    </main>
  );
}
