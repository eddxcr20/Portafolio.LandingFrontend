import { useTranslation } from "react-i18next";
import { ExperienceRow } from "~/pages/home/experience-row";
import { SectionLabel } from "~/shared/components/section-label";

const JOBS = [
  { id: "industrialComplements", isCurrent: true },
  { id: "dalton", isCurrent: false },
  { id: "algoritmosInteligentes", isCurrent: false },
] as const;

export function Experience() {
  const { t } = useTranslation("home");

  return (
    <section id="experience" className="px-gutter pb-24">
      <div
        className="mb-14 flex flex-wrap items-baseline justify-between gap-x-8
          gap-y-4"
      >
        <SectionLabel>{t("experience.label")}</SectionLabel>
        <SectionLabel>{t("experience.order")}</SectionLabel>
      </div>
      <ol className="grid">
        {JOBS.map((job, index) => (
          <ExperienceRow
            key={job.id}
            number={JOBS.length - index}
            isCurrent={job.isCurrent}
            company={t(`experience.jobs.${job.id}.company`)}
            period={t(`experience.jobs.${job.id}.period`)}
            role={t(`experience.jobs.${job.id}.role`)}
            text={t(`experience.jobs.${job.id}.text`)}
          />
        ))}
      </ol>
    </section>
  );
}
