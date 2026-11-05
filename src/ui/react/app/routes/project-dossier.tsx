import type { Route } from "./+types/project-dossier";
import { publicContainer } from "@infrastructure/public-container.server";
import { alternatePaths } from "~/app/lib/alternate-paths";
import { type PageMeta, buildPageMeta, toAbsoluteUrls } from
  "~/app/lib/page-meta";
import { toRouteError } from "~/app/lib/route-error";
import { readRouteLanguage } from "~/app/lib/route-language";
import { DossierPage } from "~/pages/project-dossier/dossier-page";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { resolveSiteOrigins } from "~/shared/lib/site-origins.server";
import { dossierPath } from "~/shared/lib/site-paths";

export async function loader({ params, request }: Route.LoaderArgs) {
  const language = readRouteLanguage(params.lang);
  const result = await publicContainer.findProjectDossier.handleAsync({
    language,
    slug: params.slug,
  });

  if (!result.isSuccess) {
    throw toRouteError(result.error);
  }

  const { dossier, featuredEntries } = result.value;
  const origins = resolveSiteOrigins(request);
  const t = i18nByLanguage[language].getFixedT(language, "dossier");
  const alternates = alternatePaths((other) =>
    dossierPath(other, dossier.slug),
  );
  const alternateUrls = toAbsoluteUrls(origins.portfolio, alternates);
  const meta: PageMeta = {
    title: t("seo.title", { name: dossier.name }),
    description: dossier.summary[0],
    language,
    type: "website",
    url: alternateUrls[language],
    alternateUrls,
  };

  return {
    language,
    alternates,
    dossier,
    featuredEntries,
    blogOrigin: origins.blog,
    meta,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return buildPageMeta(loaderData?.meta);
}

export default function ProjectDossierRoute({
  loaderData,
}: Route.ComponentProps) {
  return (
    <DossierPage
      language={loaderData.language}
      alternates={loaderData.alternates}
      dossier={loaderData.dossier}
      featuredEntries={loaderData.featuredEntries}
      blogOrigin={loaderData.blogOrigin}
    />
  );
}
