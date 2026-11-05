import { useTranslation } from "react-i18next";
import type { ProjectDossierView } from
  "@domain/model/projects/project-dossier";
import { SectionLabel } from "~/shared/components/section-label";

type DossierSheetProps = {
  readonly dossier: ProjectDossierView;
};

export function DossierSheet({ dossier }: DossierSheetProps) {
  const { t } = useTranslation("dossier");
  const fields = [
    { label: t("sheet.problem"), paragraphs: dossier.problem },
    { label: t("sheet.understanding"), paragraphs: dossier.understanding },
    { label: t("sheet.decisions"), paragraphs: dossier.decisions },
    { label: t("sheet.state"), paragraphs: dossier.state },
  ];

  return (
    <section
      id="sheet"
      className="grid grid-cols-1 gap-x-column gap-y-10 px-gutter
        pb-24 md:grid-cols-12"
    >
      {fields.map((field) => (
        <div
          key={field.label}
          className="flex flex-col gap-4 md:col-span-6 lg:col-span-3"
        >
          <SectionLabel>{field.label}</SectionLabel>
          {field.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
