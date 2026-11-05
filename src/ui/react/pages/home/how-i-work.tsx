import { useTranslation } from "react-i18next";
import { SectionLabel } from "~/shared/components/section-label";

export function HowIWork() {
  const { t } = useTranslation("home");

  return (
    <section id="how-i-work" className="px-gutter pb-24">
      <SectionLabel>{t("method.label")}</SectionLabel>
      <p className="mt-8 grid font-semibold text-stairs">
        <span className="block">{t("method.stepOne")}</span>
        <span className="ml-4 block md:ml-stair-one">
          {t("method.stepTwo")}
        </span>
        <span className="ml-8 block text-accent md:ml-stair-two">
          {t("method.stepThree")}
        </span>
      </p>
      <div
        className="mt-10 grid gap-x-block gap-y-8 text-ink-2
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      >
        <p>{t("method.order")}</p>
        <p>{t("method.domain")}</p>
      </div>
    </section>
  );
}
