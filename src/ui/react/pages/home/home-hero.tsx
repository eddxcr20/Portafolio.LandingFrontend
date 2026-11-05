import { useTranslation } from "react-i18next";
import { PlateHeadlineLine } from "~/shared/components/plate-headline-line";

export function HomeHero() {
  const { t } = useTranslation("home");

  return (
    <section className="px-gutter pt-10 pb-24">
      <h1 className="cmyk-headline -ml-[0.04em] text-hero">
        <PlateHeadlineLine text={t("hero.lineOne")} />
        <span className="block md:ml-indent">
          <PlateHeadlineLine text={t("hero.lineTwo")} />
        </span>
      </h1>
      <div
        className="mt-hero-rise grid items-end gap-x-hero-gap gap-y-8
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      >
        <h2 className="text-hero-subtitle text-muted">{t("hero.subtitle")}</h2>
        <p
          className="max-w-[34ch] justify-self-start text-lead
            lg:justify-self-end"
        >
          {t("hero.lead")}
        </p>
      </div>
    </section>
  );
}
