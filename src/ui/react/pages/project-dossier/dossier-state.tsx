import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Language } from "@domain/model/common/language";
import type { ProjectDossierView } from
  "@domain/model/projects/project-dossier";
import { FigureCaption } from "~/shared/components/figure-caption";
import { PrintFigure } from "~/shared/components/print-figure";
import { SectionLabel } from "~/shared/components/section-label";
import { homePath } from "~/shared/lib/site-paths";

type DossierStateProps = {
  readonly language: Language;
  readonly dossier: ProjectDossierView;
};

export function DossierState({ language, dossier }: DossierStateProps) {
  const { t } = useTranslation("dossier");

  return (
    <section
      id="state"
      className="grid grid-cols-1 items-start gap-x-block gap-y-10 px-gutter
        pb-28 md:grid-cols-2"
    >
      <div className="md:col-start-1 md:row-start-1">
        <SectionLabel>{t("state")}</SectionLabel>
        <h2 className="mt-8 text-section">{dossier.verdict}</h2>
        {dossier.closing.map((paragraph) => (
          <p key={paragraph} className="mt-8 max-w-[48ch] text-ink-2">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="md:col-start-2 md:row-span-2 md:row-start-1">
        <PrintFigure
          aspect="landscape"
          src={dossier.closingImage}
          alt={dossier.closingFigure.alt}
          caption={
            <FigureCaption>{dossier.closingFigure.caption}</FigureCaption>
          }
        />
      </div>
      <p className="text-secondary md:col-start-1 md:row-start-2">
        <Link to={homePath(language)}>{t("back")}</Link>
      </p>
    </section>
  );
}
