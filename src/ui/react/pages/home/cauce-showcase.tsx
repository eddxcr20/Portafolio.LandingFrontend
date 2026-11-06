import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Language } from "@domain/model/common/language";
import { ProjectNumeral } from "~/entities/project/project-numeral";
import { ProjectStatusTag } from "~/entities/project/project-status-tag";
import { ProjectTitleBlock } from "~/entities/project/project-title-block";
import { FigureCaption } from "~/shared/components/figure-caption";
import { PrintFigure } from "~/shared/components/print-figure";
import { SectionLabel } from "~/shared/components/section-label";
import { dossierPath } from "~/shared/lib/site-paths";

const CAUCE_SLUG = "cauce";
const CAUCE_ORDER = 3;
const CAUCE_IMAGE = "/images/cauce-notes.webp";

type CauceShowcaseProps = {
  readonly language: Language;
};

export function CauceShowcase({ language }: CauceShowcaseProps) {
  const { t } = useTranslation("home");

  return (
    <section
      id="cauce"
      className="grid grid-cols-1 gap-x-column px-gutter pb-24
        md:grid-cols-12"
    >
      <ProjectNumeral order={CAUCE_ORDER} />
      <ProjectTitleBlock>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <h2 className="text-project">Cauce</h2>
          <ProjectStatusTag status="in-progress" label={t("cauce.label")} />
        </div>
        <p className="mt-4 text-secondary text-muted">{t("cauce.meta")}</p>
      </ProjectTitleBlock>
      <div
        className="mt-10 self-start md:col-span-5 lg:col-span-4 lg:col-start-1
          lg:row-start-2"
      >
        <PrintFigure
          aspect="landscape"
          src={CAUCE_IMAGE}
          alt={t("cauce.imageAlt")}
          caption={<FigureCaption>{t("cauce.caption")}</FigureCaption>}
        />
      </div>
      <div
        className="mt-10 grid gap-x-block gap-y-8 md:col-span-7 lg:col-span-8
          lg:col-start-5 lg:row-start-2
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
      >
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.problemLabel")}</SectionLabel>
          <p>{t("cauce.problem")}</p>
        </div>
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.decisionLabel")}</SectionLabel>
          <p>
            {t("cauce.decision")}{" "}
            <Link to={dossierPath(language, CAUCE_SLUG)}>
              {t("cauce.readDossier")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
