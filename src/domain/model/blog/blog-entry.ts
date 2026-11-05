import type { Localized } from "@domain/model/common/localized";
import type { Tag, TagView } from "@domain/model/blog/tag";

export type EntryBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "list"; readonly items: readonly string[] };

export type BlogEntryText = {
  readonly title: string;
  readonly topic: string;
  readonly body: readonly EntryBlock[];
};

export type BlogEntry = {
  readonly date: string;
  readonly tags: readonly Tag[];
  readonly text: Localized<BlogEntryText>;
};

export type BlogEntrySummary = {
  readonly date: string;
  readonly title: string;
  readonly topic: string;
  readonly tags: readonly TagView[];
};

export type BlogEntryArticle = BlogEntrySummary & {
  readonly body: readonly EntryBlock[];
};
