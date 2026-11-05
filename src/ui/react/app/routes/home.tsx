import type { Route } from "./+types/home";
import { alternatePaths } from "~/app/lib/alternate-paths";
import { type PageMeta, buildPageMeta, toAbsoluteUrls } from
  "~/app/lib/page-meta";
import { readRouteLanguage } from "~/app/lib/route-language";
import { HomePage } from "~/pages/home/home-page";
import { CONTACT_LINKS } from "~/shared/lib/contact-links";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { resolveSiteOrigins } from "~/shared/lib/site-origins.server";
import { blogPath, homePath } from "~/shared/lib/site-paths";

export function loader({ params, request }: Route.LoaderArgs) {
  const language = readRouteLanguage(params.lang);
  const origins = resolveSiteOrigins(request);
  const t = i18nByLanguage[language].getFixedT(language, "home");
  const alternates = alternatePaths(homePath);
  const alternateUrls = toAbsoluteUrls(origins.portfolio, alternates);
  const meta: PageMeta = {
    title: t("seo.title"),
    description: t("seo.description"),
    language,
    type: "website",
    url: alternateUrls[language],
    alternateUrls,
  };

  return {
    language,
    alternates,
    blogUrl: `${origins.blog}${blogPath(language)}`,
    jobTitle: t("seo.jobTitle"),
    meta,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (loaderData === undefined) {
    return [];
  }

  return [
    ...buildPageMeta(loaderData.meta),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "José Eduardo Cruz Rosano",
        jobTitle: loaderData.jobTitle,
        url: loaderData.meta.url,
        sameAs: [CONTACT_LINKS.github, CONTACT_LINKS.linkedin],
      },
    },
  ];
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <HomePage
      language={loaderData.language}
      alternates={loaderData.alternates}
      blogUrl={loaderData.blogUrl}
    />
  );
}
