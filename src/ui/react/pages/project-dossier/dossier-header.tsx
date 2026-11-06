import type { ProjectDossierView } from
  "@domain/model/projects/project-dossier";
import { ProjectNumeral } from "~/entities/project/project-numeral";
import { ProjectStatusTag } from "~/entities/project/project-status-tag";
import { ProjectTitleBlock } from "~/entities/project/project-title-block";
import { FigureCaption } from "~/shared/components/figure-caption";
import { PrintFigure } from "~/shared/components/print-figure";
import { formatLinkLabel } from "~/shared/presentation/format-link-label";

type DossierHeaderProps = {
  readonly dossier: ProjectDossierView;
};

export function DossierHeader({ dossier }: DossierHeaderProps) {
  const [lead, ...rest] = dossier.summary;

  return (
    <section
      className="grid grid-cols-1 gap-x-column px-gutter pt-10 pb-18
        md:grid-cols-12"
    >
      <ProjectNumeral order={dossier.order} />
      <ProjectTitleBlock>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <h1 className="text-project">{dossier.name}</h1>
          <ProjectStatusTag status={dossier.status} label={dossier.label} />
        </div>
        <p className="mt-4 text-secondary text-muted">
          {dossier.meta}
          {dossier.link !== null && (
            <>
              {" · "}
              <a href={dossier.link}>{formatLinkLabel(dossier.link)}</a>
            </>
          )}
        </p>
      </ProjectTitleBlock>
      <div
        className="mt-10 self-start md:col-span-5 lg:col-span-4 lg:col-start-1
          lg:row-start-2"
      >
        <PrintFigure
          aspect="landscape"
          src={dossier.leadImage}
          alt={dossier.leadFigure.alt}
          caption={<FigureCaption>{dossier.leadFigure.caption}</FigureCaption>}
        />
      </div>
      <div
        className="mt-10 flex max-w-[62ch] flex-col gap-8 md:col-span-7
          md:justify-self-end lg:col-span-8 lg:col-start-5 lg:row-start-2"
      >
        <p className="text-summary">{lead}</p>
        {rest.map((paragraph) => (
          <p key={paragraph} className="text-ink-2">{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
