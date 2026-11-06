import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Language } from "@domain/model/common/language";
import { MirroredProjectNumeral } from
  "~/entities/project/mirrored-project-numeral";
import { MirroredProjectTitleBlock } from
  "~/entities/project/mirrored-project-title-block";
import { ProjectStatusTag } from "~/entities/project/project-status-tag";
import { FigureCaption } from "~/shared/components/figure-caption";
import { PrintFigure } from "~/shared/components/print-figure";
import { SectionLabel } from "~/shared/components/section-label";
import { dossierPath } from "~/shared/lib/site-paths";

const INDUSTRIAL_COMPLEMENTS_SLUG = "industrial-complements";
const INDUSTRIAL_COMPLEMENTS_ORDER = 2;
const INDUSTRIAL_COMPLEMENTS_IMAGE = "/images/ic-login.webp";

type IndustrialComplementsShowcaseProps = {
  readonly language: Language;
};

export function IndustrialComplementsShowcase({
  language,
}: IndustrialComplementsShowcaseProps) {
  const { t } = useTranslation("home");

  return (
    <section
      id="industrial-complements"
      className="grid grid-cols-1 gap-x-column px-gutter pb-24
        md:grid-cols-12"
    >
      <MirroredProjectNumeral order={INDUSTRIAL_COMPLEMENTS_ORDER} />
      <MirroredProjectTitleBlock>
        <div
          className="flex flex-wrap items-baseline gap-x-8 gap-y-4
            md:flex-row-reverse md:flex-nowrap"
        >
          <h2 className="text-project-compact">
            {t("industrialComplements.title")}
          </h2>
          <ProjectStatusTag
            status="in-progress"
            label={t("industrialComplements.label")}
          />
        </div>
        <p className="mt-4 text-secondary text-muted">
          {t("industrialComplements.meta")}
        </p>
      </MirroredProjectTitleBlock>
      <div
        className="mt-10 grid gap-x-block gap-y-8 md:col-span-7 lg:col-span-8
          lg:col-start-1 lg:row-start-2
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
      >
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.problemLabel")}</SectionLabel>
          <p>{t("industrialComplements.problem")}</p>
        </div>
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.decisionLabel")}</SectionLabel>
          <p>
            {t("industrialComplements.decision")}{" "}
            <Link to={dossierPath(language, INDUSTRIAL_COMPLEMENTS_SLUG)}>
              {t("industrialComplements.readProgress")}
            </Link>
          </p>
        </div>
      </div>
      <div
        className="mt-10 self-start md:col-span-5 lg:col-span-4
          lg:col-start-9 lg:row-start-2"
      >
        <PrintFigure
          aspect="landscape"
          src={INDUSTRIAL_COMPLEMENTS_IMAGE}
          alt={t("industrialComplements.imageAlt")}
          caption={
            <FigureCaption>{t("industrialComplements.caption")}</FigureCaption>
          }
        />
      </div>
    </section>
  );
}
