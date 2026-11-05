import { useTranslation } from "react-i18next";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import type { Language } from "@domain/model/common/language";
import { EntryDate } from "~/entities/blog-entry/entry-date";
import { ButtonLink } from "~/shared/components/button-link";
import { SectionLabel } from "~/shared/components/section-label";
import { blogEntryPath, blogTagPath } from "~/shared/lib/site-paths";

type FeaturedEntriesProps = {
  readonly language: Language;
  readonly projectName: string;
  readonly tagSlug: string;
  readonly entries: readonly BlogEntrySummary[];
  readonly blogOrigin: string;
};

export function FeaturedEntries({
  language,
  projectName,
  tagSlug,
  entries,
  blogOrigin,
}: FeaturedEntriesProps) {
  const { t } = useTranslation("dossier");

  return (
    <section id="stories" className="px-gutter pb-24">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-col gap-4">
          <SectionLabel>{t("featured.label")}</SectionLabel>
          <h2 className="max-w-[20ch] text-section">{t("featured.title")}</h2>
        </div>
        <div className="flex w-full flex-col md:w-auto">
          <ButtonLink
            tone="secondary"
            to={`${blogOrigin}${blogTagPath(language, tagSlug)}`}
          >
            {t("featured.all", { name: projectName })}
          </ButtonLink>
        </div>
      </div>
      <ol className="grid gap-14">
        {entries.map((entry) => (
          <li
            key={entry.date}
            className="grid grid-cols-1 items-start gap-x-column gap-y-4
              text-muted md:grid-cols-[minmax(0,2fr)_minmax(0,7fr)]
              lg:grid-cols-[minmax(0,2fr)_minmax(0,6fr)_minmax(0,2fr)]"
          >
            <div className="trim-cap-start">
              <EntryDate date={entry.date} language={language} />
            </div>
            <div>
              <h3 className="trim-cap-start text-story text-ink">
                {entry.title}
              </h3>
              <p className="mt-4 text-ink-2">{entry.topic}</p>
              <p className="mt-4 text-secondary">
                <a
                  href={`${blogOrigin}${blogEntryPath(language, entry.date)}`}
                >
                  {t("featured.read")}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
