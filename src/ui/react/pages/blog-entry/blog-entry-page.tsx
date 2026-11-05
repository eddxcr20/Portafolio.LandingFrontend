import { useTranslation } from "react-i18next";
import type { BlogEntryArticle } from "@domain/model/blog/blog-entry";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { EntryDate } from "~/entities/blog-entry/entry-date";
import { EntryTagLinks } from "~/entities/blog-entry/entry-tag-links";
import { EntryBody } from "~/pages/blog-entry/entry-body";
import { Pager } from "~/shared/components/pager";
import { blogEntryPath, blogPath } from "~/shared/lib/site-paths";
import { SiteNav } from "~/widgets/site-nav/site-nav";

type BlogEntryPageProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly entry: BlogEntryArticle;
  readonly previousDate: string | null;
  readonly nextDate: string | null;
  readonly portfolioUrl: string;
};

export function BlogEntryPage({
  language,
  alternates,
  entry,
  previousDate,
  nextDate,
  portfolioUrl,
}: BlogEntryPageProps) {
  const { t } = useTranslation("blog");
  const pager = (
    <Pager
      previousHref={
        previousDate === null ? null : blogEntryPath(language, previousDate)
      }
      nextHref={nextDate === null ? null : blogEntryPath(language, nextDate)}
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
      <main className="grid gap-10 px-gutter pt-8 pb-28">
        {pager}
        <header className="grid gap-8">
          <h1 className="-ml-[0.03em] text-entry">{entry.title}</h1>
          <div className="text-muted">
            <EntryDate date={entry.date} language={language} />
          </div>
        </header>
        <article className="grid gap-4">
          <EntryBody blocks={entry.body} />
          <div
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-caption
              text-muted"
          >
            <EntryTagLinks language={language} tags={entry.tags} />
          </div>
        </article>
        {pager}
      </main>
    </div>
  );
}
