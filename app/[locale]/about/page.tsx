import { getTranslations, setRequestLocale } from "next-intl/server";
import { StubPage } from "@/components/stub-page";
import { requireLocale } from "@/i18n/params";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const locale = await requireLocale(params);
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return { title: t("title") };
}

export default async function Page({ params }: PageProps<"/[locale]/about">) {
  const locale = await requireLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return <StubPage title={t("title")} />;
}
