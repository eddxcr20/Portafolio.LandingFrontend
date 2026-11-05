import type { BlogEntry, BlogEntryText } from
  "@domain/model/blog/blog-entry";
import type { Tag } from "@domain/model/blog/tag";

export const graphtTag: Tag = {
  id: "grapht",
  label: { es: "GraphT", en: "GraphT" },
};

export const adhdTag: Tag = {
  id: "adhd",
  label: { es: "TDAH", en: "ADHD" },
};

export const gamificationTag: Tag = {
  id: "gamification",
  label: { es: "Gamificación", en: "Gamification" },
};

const entryText = (title: string): BlogEntryText => ({
  title,
  topic: `${title} topic`,
  body: [
    { kind: "paragraph", text: `${title} body` },
    { kind: "list", items: [`${title} item`] },
  ],
});

export const blogEntry = (
  date: string,
  tags: readonly Tag[],
): BlogEntry => ({
  date,
  tags,
  text: { es: entryText(`Entrada ${date}`), en: entryText(`Entry ${date}`) },
});

export const oldestEntry = blogEntry("2026-08-01", [graphtTag]);
export const middleEntry = blogEntry("2026-09-12", [graphtTag, adhdTag]);
export const newestEntry = blogEntry("2026-10-20", [
  graphtTag,
  adhdTag,
  gamificationTag,
]);

export const blogEntries: readonly BlogEntry[] = [
  middleEntry,
  newestEntry,
  oldestEntry,
];
