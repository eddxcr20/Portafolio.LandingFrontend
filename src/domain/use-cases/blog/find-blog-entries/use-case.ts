import { toDomainError } from "@domain/common/domain-error";
import type { DomainPort } from "@domain/common/domain-port";
import { DomainResult } from "@domain/common/domain-result";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import {
  type TagCount,
  countTags,
  findTagBySlug,
  hasTag,
  sortNewestFirst,
  summarizeEntry,
} from "@domain/model/blog/blog-entry-rules";
import { pageNotFoundError, tagNotFoundError } from
  "@domain/model/blog/blog-errors";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import { toTagSlugs } from "@domain/model/blog/tag";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { paginate } from "@domain/model/common/page";

const ENTRIES_PER_PAGE = 10;

export type InputDto = {
  readonly language: Language;
  readonly tagSlug: string | null;
  readonly page: number;
};

export type ActiveTag = {
  readonly label: string;
  readonly slugs: Localized<string>;
};

export type OutputDto = {
  readonly entries: readonly BlogEntrySummary[];
  readonly totalEntries: number;
  readonly page: number;
  readonly pageCount: number;
  readonly tags: readonly TagCount[];
  readonly activeTag: ActiveTag | null;
};

export interface FindBlogEntriesUseCase
  extends DomainPort<InputDto, DomainResult<OutputDto>> {}

export class UseCase implements FindBlogEntriesUseCase {
  private readonly findBlogEntriesPort: FindBlogEntriesPort;

  constructor(findBlogEntriesPort: FindBlogEntriesPort) {
    this.findBlogEntriesPort = findBlogEntriesPort;
  }

  async handleAsync(input: InputDto): Promise<DomainResult<OutputDto>> {
    try {
      const entries = await this.findBlogEntriesPort.handleAsync();
      const tags = countTags(entries, input.language);
      const tag = input.tagSlug === null
        ? null
        : findTagBySlug(entries, input.tagSlug, input.language);

      if (input.tagSlug !== null && tag === null) {
        return DomainResult.failure(tagNotFoundError(input.tagSlug));
      }

      const listed = tag === null
        ? entries
        : entries.filter((entry) => hasTag(entry, tag));
      const page = paginate(
        sortNewestFirst(listed),
        input.page,
        ENTRIES_PER_PAGE,
      );

      if (page === null) {
        return DomainResult.failure(pageNotFoundError(input.page));
      }

      const activeTag = tag === null
        ? null
        : { label: tag.label[input.language], slugs: toTagSlugs(tag) };

      return DomainResult.success({
        entries: page.items.map((entry) =>
          summarizeEntry(entry, input.language),
        ),
        totalEntries: page.total,
        page: page.number,
        pageCount: page.count,
        tags,
        activeTag,
      });
    } catch (error) {
      return DomainResult.failure(toDomainError(error));
    }
  }
}
