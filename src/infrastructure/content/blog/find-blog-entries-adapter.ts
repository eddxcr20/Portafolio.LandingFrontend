import type {
  BlogEntry,
  BlogEntryText,
  EntryBlock,
} from "@domain/model/blog/blog-entry";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import { type TagLabelsDocument, toTag } from
  "@infrastructure/content/common/tag-labels";

type EntryBlockDocument = string | readonly string[];

type BlogEntryTextDocument = {
  readonly title: string;
  readonly topic: string;
  readonly body: readonly EntryBlockDocument[];
};

export type BlogEntryDocument = {
  readonly date: string;
  readonly tags: readonly string[];
  readonly es: BlogEntryTextDocument;
  readonly en: BlogEntryTextDocument;
};

const toBlock = (block: EntryBlockDocument): EntryBlock =>
  typeof block === "string"
    ? { kind: "paragraph", text: block }
    : { kind: "list", items: block };

const toText = (text: BlogEntryTextDocument): BlogEntryText => ({
  title: text.title,
  topic: text.topic,
  body: text.body.map(toBlock),
});

const toBlogEntry = (
  document: BlogEntryDocument,
  labels: TagLabelsDocument,
): BlogEntry => ({
  date: document.date,
  tags: document.tags.map((tag) => toTag(tag, labels)),
  text: { es: toText(document.es), en: toText(document.en) },
});

export class FindBlogEntriesAdapter implements FindBlogEntriesPort {
  private readonly entries: readonly BlogEntry[];

  constructor(
    documents: readonly BlogEntryDocument[],
    labels: TagLabelsDocument,
  ) {
    this.entries = documents.map((document) =>
      toBlogEntry(document, labels),
    );
  }

  async handleAsync(): Promise<readonly BlogEntry[]> {
    return this.entries;
  }
}
