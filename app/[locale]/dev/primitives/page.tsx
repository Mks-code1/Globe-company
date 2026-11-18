import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { requireLocale } from "@/i18n/params";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SWATCHES = [
  ["bg-bg", "bg"],
  ["bg-bg-raised", "bg-raised"],
  ["bg-fg", "fg"],
  ["bg-fg-muted", "fg-muted"],
  ["bg-accent", "accent"],
  ["bg-accent-text", "accent-text"],
] as const;

export default async function PrimitivesPage({ params }: PageProps<"/[locale]/dev/primitives">) {
  // Dev only: not reachable in production builds.
  if (process.env.NODE_ENV === "production") notFound();

  const locale = await requireLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dev" });

  return (
    <main id="main" className="mx-auto max-w-(--container-max) px-(--gutter) py-(--section-y)">
      <h1 className="text-h2 font-semibold">{t("primitivesTitle")}</h1>

      <section className="mt-12 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
        {SWATCHES.map(([cls, label]) => (
          <div key={label} className="bg-bg p-4">
            <div className={`h-16 border border-line ${cls}`} />
            <p className="mt-3 text-small text-fg-muted">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <Dialog>
          <DialogTrigger className="bg-accent px-8 py-4 font-bold text-on-accent">
            {t("openDialog")}
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{t("dialogTitle")}</DialogTitle>
            <DialogDescription>{t("dialogDescription")}</DialogDescription>
            <DialogClose className="mt-8 border border-line-strong px-8 py-4 font-bold">
              {t("closeDialog")}
            </DialogClose>
          </DialogContent>
        </Dialog>
      </section>

      <section className="mt-16 max-w-(--container-text)">
        <Accordion type="single" collapsible>
          <AccordionItem value="q1">
            <AccordionTrigger>{t("accordionQ1")}</AccordionTrigger>
            <AccordionContent>{t("accordionA1")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>{t("accordionQ2")}</AccordionTrigger>
            <AccordionContent>{t("accordionA2")}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
