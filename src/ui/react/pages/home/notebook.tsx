import { useTranslation } from "react-i18next";
import { joinClassNames } from "~/shared/lib/join-class-names";

const NOTEBOOK_PAGES = [
  {
    image: "/images/notebook-task-states.webp",
    alt: "taskStates",
    layer: "z-1",
  },
  { image: "/images/notebook-quotes.webp", alt: "quotes", layer: "z-2" },
  { image: "/images/whiteboard.webp", alt: "whiteboard", layer: "z-3" },
  { image: "/images/notebook-payments.webp", alt: "payments", layer: "z-4" },
  { image: "/images/notebook-ideas.webp", alt: "ideas", layer: "z-5" },
] as const;

export function Notebook() {
  const { t } = useTranslation("home");

  return (
    <section className="px-gutter pb-24">
      <div className="flex items-end justify-center pt-8 pb-6">
        {NOTEBOOK_PAGES.map((page) => (
          <div
            key={page.image}
            className={joinClassNames(
              "relative aspect-[3/4] w-[120px] flex-none bg-print p-2 pb-6",
              "shadow-print transition-[translate,box-shadow]",
              "duration-[250ms] ease-[ease] not-first:-ml-20",
              "hover:z-10 hover:-translate-y-4 hover:shadow-print-raised",
              "motion-reduce:transition-none md:w-print md:pb-10",
              "md:not-first:-ml-print-overlap",
              page.layer,
            )}
          >
            <img
              src={page.image}
              alt={t(`notebook.alts.${page.alt}`)}
              loading="lazy"
              decoding="async"
              className="block size-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-caption text-muted">
        {t("notebook.caption")}
      </p>
    </section>
  );
}
