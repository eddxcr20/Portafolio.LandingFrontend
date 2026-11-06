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

const GRAPHT_SLUG = "grapht";
const GRAPHT_ORDER = 1;
const GRAPHT_IMAGE = "/images/grapht-workbench.webp";

type GraphtShowcaseProps = {
  readonly language: Language;
};

export function GraphtShowcase({ language }: GraphtShowcaseProps) {
  const { t } = useTranslation("home");

  return (
    <section
      id="projects"
      className="grid grid-cols-1 gap-x-column px-gutter pb-24
        md:grid-cols-12"
    >
      <ProjectNumeral order={GRAPHT_ORDER} />
      <ProjectTitleBlock>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <h2 className="text-project">GraphT</h2>
          <ProjectStatusTag status="working" label={t("grapht.label")} />
        </div>
        <p className="mt-4 text-secondary text-muted">{t("grapht.meta")}</p>
      </ProjectTitleBlock>
      <div
        className="mt-10 self-start md:col-span-5 lg:col-span-4 lg:col-start-1
          lg:row-start-2"
      >
        <PrintFigure
          aspect="landscape"
          src={GRAPHT_IMAGE}
          alt={t("grapht.imageAlt")}
          caption={<FigureCaption>{t("grapht.caption")}</FigureCaption>}
        />
      </div>
      <div
        className="mt-10 grid gap-x-block gap-y-8 md:col-span-7 lg:col-span-8
          lg:col-start-5 lg:row-start-2
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
      >
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.problemLabel")}</SectionLabel>
          <p>{t("grapht.problem")}</p>
        </div>
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("showcase.decisionLabel")}</SectionLabel>
          <p>
            {t("grapht.decision")}{" "}
            <Link to={dossierPath(language, GRAPHT_SLUG)}>
              {t("grapht.readDossier")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
