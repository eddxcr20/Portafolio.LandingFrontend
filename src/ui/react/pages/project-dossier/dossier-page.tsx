import { useTranslation } from "react-i18next";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import type { ProjectDossierView } from
  "@domain/model/projects/project-dossier";
import { DossierHeader } from "~/pages/project-dossier/dossier-header";
import { DossierPieces } from "~/pages/project-dossier/dossier-pieces";
import { DossierSheet } from "~/pages/project-dossier/dossier-sheet";
import { DossierState } from "~/pages/project-dossier/dossier-state";
import { FeaturedEntries } from "~/pages/project-dossier/featured-entries";
import { blogPath, homePath } from "~/shared/lib/site-paths";
import { formatProjectNumber } from
  "~/shared/presentation/format-project-number";
import { SiteNav } from "~/widgets/site-nav/site-nav";

type DossierPageProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly dossier: ProjectDossierView;
  readonly featuredEntries: readonly BlogEntrySummary[];
  readonly blogOrigin: string;
};

export function DossierPage({
  language,
  alternates,
  dossier,
  featuredEntries,
  blogOrigin,
}: DossierPageProps) {
  const { t } = useTranslation("dossier");

  return (
    <div className="@container mx-auto max-w-page text-body">
      <SiteNav
        language={language}
        alternates={alternates}
        subtitle={t("caseFile", {
          number: formatProjectNumber(dossier.order),
          name: dossier.name,
        })}
        brandHref={homePath(language)}
        brandLabel={t("common:brand.portfolio")}
        links={[
          { href: "#sheet", label: t("nav.sheet") },
          { href: "#stories", label: t("nav.stories") },
          { href: "#state", label: t("nav.state") },
          { href: homePath(language), label: t("common:nav.home") },
          {
            href: `${blogOrigin}${blogPath(language)}`,
            label: t("common:nav.blog"),
          },
        ]}
      />
      <main>
        <DossierHeader dossier={dossier} />
        <DossierSheet dossier={dossier} />
        <DossierPieces pieces={dossier.pieces} />
        <FeaturedEntries
          language={language}
          projectName={dossier.name}
          tagSlug={dossier.tagSlug}
          entries={featuredEntries}
          blogOrigin={blogOrigin}
        />
        <DossierState language={language} dossier={dossier} />
      </main>
    </div>
  );
}
