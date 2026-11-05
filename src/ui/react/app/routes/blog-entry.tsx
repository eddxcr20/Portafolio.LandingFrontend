import type { Route } from "./+types/blog-entry";
import { publicContainer } from "@infrastructure/public-container.server";
import { alternatePaths } from "~/app/lib/alternate-paths";
import { type PageMeta, buildPageMeta, toAbsoluteUrls } from
  "~/app/lib/page-meta";
import { toRouteError } from "~/app/lib/route-error";
import { readRouteLanguage } from "~/app/lib/route-language";
import { BlogEntryPage } from "~/pages/blog-entry/blog-entry-page";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { resolveSiteOrigins } from "~/shared/lib/site-origins.server";
import { blogEntryPath, homePath } from "~/shared/lib/site-paths";

export async function loader({ params, request }: Route.LoaderArgs) {
  const language = readRouteLanguage(params.lang);
  const result = await publicContainer.findBlogEntry.handleAsync({
    language,
    date: params.date,
  });

  if (!result.isSuccess) {
    throw toRouteError(result.error);
  }

  const { entry, previousDate, nextDate } = result.value;
  const origins = resolveSiteOrigins(request);
  const t = i18nByLanguage[language].getFixedT(language, "blog");
  const alternates = alternatePaths((other) =>
    blogEntryPath(other, entry.date),
  );
  const alternateUrls = toAbsoluteUrls(origins.blog, alternates);
  const meta: PageMeta = {
    title: t("seo.entryTitle", { title: entry.title }),
    description: entry.topic,
    language,
    type: "article",
    url: alternateUrls[language],
    alternateUrls,
  };

  return {
    language,
    alternates,
    entry,
    previousDate,
    nextDate,
    portfolioUrl: `${origins.portfolio}${homePath(language)}`,
    meta,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (loaderData === undefined) {
    return [];
  }

  return [
    ...buildPageMeta(loaderData.meta),
    { property: "article:published_time", content: loaderData.entry.date },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: loaderData.entry.title,
        description: loaderData.entry.topic,
        datePublished: loaderData.entry.date,
        inLanguage: loaderData.language,
        url: loaderData.meta.url,
        author: { "@type": "Person", name: "José Eduardo Cruz Rosano" },
      },
    },
  ];
}

export default function BlogEntryRoute({ loaderData }: Route.ComponentProps) {
  return (
    <BlogEntryPage
      language={loaderData.language}
      alternates={loaderData.alternates}
      entry={loaderData.entry}
      previousDate={loaderData.previousDate}
      nextDate={loaderData.nextDate}
      portfolioUrl={loaderData.portfolioUrl}
    />
  );
}
