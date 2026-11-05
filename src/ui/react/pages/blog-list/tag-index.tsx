import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { TagCount } from "@domain/model/blog/blog-entry-rules";
import type { Language } from "@domain/model/common/language";
import { CamelCaseText } from "~/shared/components/camel-case-text";
import { SectionLabel } from "~/shared/components/section-label";
import { joinClassNames } from "~/shared/lib/join-class-names";
import { blogPath, blogTagPath } from "~/shared/lib/site-paths";

type TagIndexProps = {
  readonly language: Language;
  readonly tags: readonly TagCount[];
  readonly activeLabel: string | null;
};

export function TagIndex({ language, tags, activeLabel }: TagIndexProps) {
  const { t } = useTranslation("blog");

  return (
    <aside
      className="grid min-w-0 content-start gap-2 text-secondary
        md:col-span-3 md:col-start-10"
    >
      <div className="mb-2">
        <SectionLabel>{t("tags")}</SectionLabel>
      </div>
      {tags.map((count) => (
        <Link
          key={count.tag.slug}
          to={blogTagPath(language, count.tag.slug)}
          aria-current={count.tag.label === activeLabel ? "page" : undefined}
          className={joinClassNames(
            "flex justify-between gap-4 no-underline hover:text-accent",
            count.tag.label === activeLabel ? "text-link" : "text-ink",
          )}
        >
          <span className="min-w-0 wrap-break-word">
            #<CamelCaseText text={count.tag.label} />
          </span>
          <span className="flex-none text-muted">{count.count}</span>
        </Link>
      ))}
      {activeLabel !== null && (
        <Link to={blogPath(language)} className="mt-4 text-caption">
          {t("clearFilter")}
        </Link>
      )}
    </aside>
  );
}
