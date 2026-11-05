import type { Language } from "@domain/model/common/language";
import { publicContainer } from "@infrastructure/public-container.server";
import { alternatePaths } from "~/app/lib/alternate-paths";
import { type PageMeta, toAbsoluteUrls } from "~/app/lib/page-meta";
import { toRouteError } from "~/app/lib/route-error";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { resolveSiteOrigins } from "~/shared/lib/site-origins.server";
import {
  blogPath,
  blogTagPath,
  homePath,
  pagedPath,
} from "~/shared/lib/site-paths";

const readPage = (request: Request): number => {
  const page = new URL(request.url).searchParams.get("page");

  return page === null ? 1 : Number(page);
};

export const loadBlogList = async (
  request: Request,
  language: Language,
  tagSlug: string | null,
) => {
  const result = await publicContainer.findBlogEntries.handleAsync({
    language,
    tagSlug,
    page: readPage(request),
  });

  if (!result.isSuccess) {
    throw toRouteError(result.error);
  }

  const { entries, totalEntries, page, pageCount, tags, activeTag } =
    result.value;
  const origins = resolveSiteOrigins(request);
  const t = i18nByLanguage[language].getFixedT(language, "blog");
  const listPath = (other: Language): string =>
    activeTag === null
      ? blogPath(other)
      : blogTagPath(other, activeTag.slugs[other]);
  const alternates = alternatePaths((other) =>
    pagedPath(listPath(other), page),
  );
  const alternateUrls = toAbsoluteUrls(origins.blog, alternates);
  const meta: PageMeta = {
    title: activeTag === null
      ? t("seo.title")
      : t("seo.tagTitle", { tag: activeTag.label }),
    description: activeTag === null
      ? t("seo.description")
      : t("seo.tagDescription", { tag: activeTag.label }),
    language,
    type: "website",
    url: alternateUrls[language],
    alternateUrls,
  };

  return {
    language,
    alternates,
    entries,
    totalEntries,
    page,
    pageCount,
    tags,
    activeTag,
    portfolioUrl: `${origins.portfolio}${homePath(language)}`,
    meta,
  };
};
