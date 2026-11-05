import { useTranslation } from "react-i18next";

export function ForBusiness() {
  const { t } = useTranslation("home");

  return (
    <section
      className="grid grid-cols-1 items-center gap-x-column gap-y-8 px-gutter
        pb-24 md:grid-cols-12"
    >
      <h2
        className="text-question font-normal italic md:col-span-7
          md:col-start-6 md:row-start-1 md:text-right"
      >
        {t("business.question")}
      </h2>
      <p className="text-ink-2 md:col-span-5 md:col-start-1 md:row-start-1">
        {t("business.pitch")}
      </p>
    </section>
  );
}
