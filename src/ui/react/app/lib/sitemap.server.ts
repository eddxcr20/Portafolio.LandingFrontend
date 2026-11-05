import { LANGUAGES, type Language } from "@domain/model/common/language";
import { publicContainer } from "@infrastructure/public-container.server";
import {
  blogEntryPath,
  blogPath,
  blogTagPath,
  dossierPath,
  homePath,
} from "~/shared/lib/site-paths";

export type SitemapUrl = {
  readonly path: string;
  readonly lastModified: string | null;
};

const portfolioUrls = async (
  language: Language,
): Promise<readonly SitemapUrl[]> => {
  const result = await publicContainer.findProjectSlugs.handleAsync();
  const slugs = result.isSuccess ? result.value.slugs : [];

  return [
    { path: homePath(language), lastModified: null },
    ...slugs.map((slug) => ({
      path: dossierPath(language, slug),
      lastModified: null,
    })),
  ];
};

const findBlogPage = (language: Language, page: number) =>
  publicContainer.findBlogEntries.handleAsync({
    language,
    tagSlug: null,
    page,
  });

const blogUrls = async (
  language: Language,
): Promise<readonly SitemapUrl[]> => {
  const first = await findBlogPage(language, 1);

  if (!first.isSuccess) {
    return [];
  }

  const otherPages = Array.from(
    { length: first.value.pageCount - 1 },
    (_, index) => index + 2,
  );
  const rest = await Promise.all(
    otherPages.map((page) => findBlogPage(language, page)),
  );
  const entries = [first, ...rest].flatMap((result) =>
    result.isSuccess ? result.value.entries : [],
  );

  return [
    { path: blogPath(language), lastModified: entries[0]?.date ?? null },
    ...first.value.tags.map((count) => ({
      path: blogTagPath(language, count.tag.slug),
      lastModified: null,
    })),
    ...entries.map((entry) => ({
      path: blogEntryPath(language, entry.date),
      lastModified: entry.date,
    })),
  ];
};

export const collectSitemapUrls = async (
  includePortfolio: boolean,
  includeBlog: boolean,
): Promise<readonly SitemapUrl[]> => {
  const groups = await Promise.all(
    LANGUAGES.flatMap((language) => [
      includePortfolio ? portfolioUrls(language) : Promise.resolve([]),
      includeBlog ? blogUrls(language) : Promise.resolve([]),
    ]),
  );

  return groups.flat();
};
