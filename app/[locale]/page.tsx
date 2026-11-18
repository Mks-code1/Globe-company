import { getTranslations, setRequestLocale } from "next-intl/server";
import { StubPage } from "@/components/stub-page";
import { requireLocale } from "@/i18n/params";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const locale = await requireLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.home" });
  return <StubPage title={t("title")} />;
}
