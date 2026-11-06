import { useTranslation } from "react-i18next";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import type { TagCount } from "@domain/model/blog/blog-entry-rules";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import type { ActiveTag } from
  "@domain/use-cases/blog/find-blog-entries/use-case";
import { EntryRow } from "~/pages/blog-list/entry-row";
import { TagIndex } from "~/pages/blog-list/tag-index";
import { CamelCaseText } from "~/shared/components/camel-case-text";
import { Pager } from "~/shared/components/pager";
import { blogPath, blogTagPath, pagedPath } from "~/shared/lib/site-paths";
import { SiteNav } from "~/widgets/site-nav/site-nav";

type BlogListPageProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly entries: readonly BlogEntrySummary[];
  readonly totalEntries: number;
  readonly page: number;
  readonly pageCount: number;
  readonly tags: readonly TagCount[];
  readonly activeTag: ActiveTag | null;
  readonly portfolioUrl: string;
};

export function BlogListPage({
  language,
  alternates,
  entries,
  totalEntries,
  page,
  pageCount,
  tags,
  activeTag,
  portfolioUrl,
}: BlogListPageProps) {
  const { t } = useTranslation("blog");
  const listPath = activeTag === null
    ? blogPath(language)
    : blogTagPath(language, activeTag.slugs[language]);
  const pager = pageCount > 1 && (
    <Pager
      previousHref={page > 1 ? pagedPath(listPath, page - 1) : null}
      nextHref={page < pageCount ? pagedPath(listPath, page + 1) : null}
      previousLabel={t("previous")}
      nextLabel={t("next")}
    />
  );

  return (
    <div className="@container mx-auto max-w-page text-body">
      <SiteNav
        language={language}
        alternates={alternates}
        subtitle={t("subtitle")}
        brandHref={blogPath(language)}
        brandLabel={t("common:brand.entries")}
        links={[
          { href: blogPath(language), label: t("common:nav.entries") },
          { href: portfolioUrl, label: t("common:nav.portfolio") },
        ]}
      />
      <main>
        <section className="px-gutter pt-6 pb-8 md:pt-10 md:pb-14">
          <h1 className="-ml-[0.04em] text-stairs">
            {activeTag === null ? t("title") : (
              <>
                #<CamelCaseText text={activeTag.label} />
              </>
            )}
          </h1>
          {activeTag !== null && (
            <p className="mt-8 text-lead">
              {t("taggedCount", { count: totalEntries })}
            </p>
          )}
        </section>
        <section
          className="grid grid-cols-1 items-start gap-x-column gap-y-14
            px-gutter pb-28 md:grid-cols-12 md:pt-8"
        >
          <div className="grid gap-10 md:col-span-9">
            {pager}
            <ol className="grid gap-14">
              {entries.map((entry) => (
                <EntryRow
                  key={entry.date}
                  language={language}
                  entry={entry}
                />
              ))}
            </ol>
            {pager}
          </div>
          <TagIndex
            language={language}
            tags={tags}
            activeLabel={activeTag?.label ?? null}
          />
        </section>
      </main>
    </div>
  );
}
