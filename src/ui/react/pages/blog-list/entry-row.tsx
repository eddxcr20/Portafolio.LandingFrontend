import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import type { Language } from "@domain/model/common/language";
import { EntryDate } from "~/entities/blog-entry/entry-date";
import { EntryTagLinks } from "~/entities/blog-entry/entry-tag-links";
import { blogEntryPath } from "~/shared/lib/site-paths";

type EntryRowProps = {
  readonly language: Language;
  readonly entry: BlogEntrySummary;
};

export function EntryRow({ language, entry }: EntryRowProps) {
  const { t } = useTranslation("blog");
  const entryPath = blogEntryPath(language, entry.date);

  return (
    <li
      className="grid grid-cols-1 items-start gap-x-column gap-y-4
        md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]"
    >
      <div className="trim-cap-start text-caption text-muted">
        <EntryDate date={entry.date} language={language} />
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          <EntryTagLinks language={language} tags={entry.tags} />
        </div>
      </div>
      <div>
        <h2 className="trim-cap-start text-row">
          <Link
            to={entryPath}
            className="text-ink no-underline hover:text-accent"
          >
            {entry.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-[62ch] text-ink-2">{entry.topic}</p>
        <p className="mt-4 text-secondary">
          <Link to={entryPath}>{t("read")}</Link>
        </p>
      </div>
    </li>
  );
}
