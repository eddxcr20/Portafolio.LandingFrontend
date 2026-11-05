import { toDomainError } from "@domain/common/domain-error";
import type { DomainPort } from "@domain/common/domain-port";
import { DomainResult } from "@domain/common/domain-result";
import type { BlogEntryArticle } from "@domain/model/blog/blog-entry";
import { findAdjacentEntries, toArticle } from
  "@domain/model/blog/blog-entry-rules";
import { blogEntryNotFoundError } from "@domain/model/blog/blog-errors";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import type { Language } from "@domain/model/common/language";

export type InputDto = {
  readonly language: Language;
  readonly date: string;
};

export type OutputDto = {
  readonly entry: BlogEntryArticle;
  readonly previousDate: string | null;
  readonly nextDate: string | null;
};

export interface FindBlogEntryUseCase
  extends DomainPort<InputDto, DomainResult<OutputDto>> {}

export class UseCase implements FindBlogEntryUseCase {
  private readonly findBlogEntriesPort: FindBlogEntriesPort;

  constructor(findBlogEntriesPort: FindBlogEntriesPort) {
    this.findBlogEntriesPort = findBlogEntriesPort;
  }

  async handleAsync(input: InputDto): Promise<DomainResult<OutputDto>> {
    try {
      const entries = await this.findBlogEntriesPort.handleAsync();
      const entry = entries.find((other) => other.date === input.date);

      if (entry === undefined) {
        return DomainResult.failure(blogEntryNotFoundError(input.date));
      }

      const adjacent = findAdjacentEntries(entries, entry);

      return DomainResult.success({
        entry: toArticle(entry, input.language),
        previousDate: adjacent.previous?.date ?? null,
        nextDate: adjacent.next?.date ?? null,
      });
    } catch (error) {
      return DomainResult.failure(toDomainError(error));
    }
  }
}
