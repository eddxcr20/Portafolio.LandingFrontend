import { toDomainError } from "@domain/common/domain-error";
import type { DomainPort } from "@domain/common/domain-port";
import { DomainResult } from "@domain/common/domain-result";
import type { FindProjectDossiersPort } from
  "@domain/model/projects/ports/find-project-dossiers-port";

export type OutputDto = {
  readonly slugs: readonly string[];
};

export interface FindProjectSlugsUseCase
  extends DomainPort<void, DomainResult<OutputDto>> {}

export class UseCase implements FindProjectSlugsUseCase {
  private readonly findProjectDossiersPort: FindProjectDossiersPort;

  constructor(findProjectDossiersPort: FindProjectDossiersPort) {
    this.findProjectDossiersPort = findProjectDossiersPort;
  }

  async handleAsync(): Promise<DomainResult<OutputDto>> {
    try {
      const dossiers = await this.findProjectDossiersPort.handleAsync();

      return DomainResult.success({
        slugs: dossiers.map((dossier) => dossier.slug),
      });
    } catch (error) {
      return DomainResult.failure(toDomainError(error));
    }
  }
}
