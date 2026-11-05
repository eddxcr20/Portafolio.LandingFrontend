import { toDomainError } from "@domain/common/domain-error";
import type { DomainPort } from "@domain/common/domain-port";
import { DomainResult } from "@domain/common/domain-result";
import type { BlogEntrySummary } from "@domain/model/blog/blog-entry";
import { selectLatestTagged, summarizeEntry } from
  "@domain/model/blog/blog-entry-rules";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import type { Language } from "@domain/model/common/language";
import type { FindProjectDossiersPort } from
  "@domain/model/projects/ports/find-project-dossiers-port";
import type { ProjectDossierView } from
  "@domain/model/projects/project-dossier";
import { viewDossier } from "@domain/model/projects/project-dossier-rules";
import { projectNotFoundError } from "@domain/model/projects/project-errors";

const FEATURED_ENTRIES_LIMIT = 4;

export type InputDto = {
  readonly language: Language;
  readonly slug: string;
};

export type OutputDto = {
  readonly dossier: ProjectDossierView;
  readonly featuredEntries: readonly BlogEntrySummary[];
};

export interface FindProjectDossierUseCase
  extends DomainPort<InputDto, DomainResult<OutputDto>> {}

export class UseCase implements FindProjectDossierUseCase {
  private readonly findProjectDossiersPort: FindProjectDossiersPort;
  private readonly findBlogEntriesPort: FindBlogEntriesPort;

  constructor(
    findProjectDossiersPort: FindProjectDossiersPort,
    findBlogEntriesPort: FindBlogEntriesPort,
  ) {
    this.findProjectDossiersPort = findProjectDossiersPort;
    this.findBlogEntriesPort = findBlogEntriesPort;
  }

  async handleAsync(input: InputDto): Promise<DomainResult<OutputDto>> {
    try {
      const dossiers = await this.findProjectDossiersPort.handleAsync();
      const dossier = dossiers.find((other) => other.slug === input.slug);

      if (dossier === undefined) {
        return DomainResult.failure(projectNotFoundError(input.slug));
      }

      const entries = await this.findBlogEntriesPort.handleAsync();
      const featured = selectLatestTagged(
        entries,
        dossier.tag,
        FEATURED_ENTRIES_LIMIT,
      );

      return DomainResult.success({
        dossier: viewDossier(dossier, input.language),
        featuredEntries: featured.map((entry) =>
          summarizeEntry(entry, input.language),
        ),
      });
    } catch (error) {
      return DomainResult.failure(toDomainError(error));
    }
  }
}
