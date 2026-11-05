import type {
  BlogEntry,
  BlogEntryArticle,
  BlogEntrySummary,
} from "@domain/model/blog/blog-entry";
import type { Language } from "@domain/model/common/language";
import { type Tag, type TagView, toTagSlug, viewTag } from
  "@domain/model/blog/tag";

export type TagCount = {
  readonly tag: TagView;
  readonly count: number;
};

export type AdjacentEntries = {
  readonly previous: BlogEntry | null;
  readonly next: BlogEntry | null;
};

export const sortNewestFirst = (
  entries: readonly BlogEntry[],
): readonly BlogEntry[] =>
  [...entries].sort((left, right) => right.date.localeCompare(left.date));

export const hasTag = (entry: BlogEntry, tag: Tag): boolean =>
  entry.tags.some((entryTag) => entryTag.id === tag.id);

export const selectLatestTagged = (
  entries: readonly BlogEntry[],
  tag: Tag,
  limit: number,
): readonly BlogEntry[] =>
  sortNewestFirst(entries.filter((entry) => hasTag(entry, tag)))
    .slice(0, limit);

export const findTagBySlug = (
  entries: readonly BlogEntry[],
  slug: string,
  language: Language,
): Tag | null =>
  entries
    .flatMap((entry) => entry.tags)
    .find((tag) => toTagSlug(tag.label[language]) === slug) ?? null;

export const countTags = (
  entries: readonly BlogEntry[],
  language: Language,
): readonly TagCount[] => {
  const tags = entries.flatMap((entry) => entry.tags);
  const uniqueTags = tags.filter(
    (tag, index) => tags.findIndex((other) => other.id === tag.id) === index,
  );

  return uniqueTags
    .map((tag) => ({
      tag: viewTag(tag, language),
      count: entries.filter((entry) => hasTag(entry, tag)).length,
    }))
    .sort((left, right) =>
      right.count - left.count ||
      left.tag.label.localeCompare(right.tag.label),
    );
};

export const findAdjacentEntries = (
  entries: readonly BlogEntry[],
  entry: BlogEntry,
): AdjacentEntries => {
  const sorted = sortNewestFirst(entries);
  const index = sorted.findIndex((other) => other.date === entry.date);

  return {
    previous: sorted[index + 1] ?? null,
    next: sorted[index - 1] ?? null,
  };
};

export const summarizeEntry = (
  entry: BlogEntry,
  language: Language,
): BlogEntrySummary => ({
  date: entry.date,
  title: entry.text[language].title,
  topic: entry.text[language].topic,
  tags: entry.tags.map((tag) => viewTag(tag, language)),
});

export const toArticle = (
  entry: BlogEntry,
  language: Language,
): BlogEntryArticle => ({
  ...summarizeEntry(entry, language),
  body: entry.text[language].body,
});
