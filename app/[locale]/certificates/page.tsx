import { getTranslations, setRequestLocale } from "next-intl/server";
import { StubPage } from "@/components/stub-page";
import { requireLocale } from "@/i18n/params";

export async function generateMetadata({ params }: PageProps<"/[locale]/certificates">) {
  const locale = await requireLocale(params);
  const t = await getTranslations({ locale, namespace: "pages.certificates" });
  return { title: t("title") };
}

export default async function Page({ params }: PageProps<"/[locale]/certificates">) {
  const locale = await requireLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.certificates" });
  return <StubPage title={t("title")} />;
}
