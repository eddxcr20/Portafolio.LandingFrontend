import type { DomainPort } from "@domain/common/domain-port";
import type { ProjectDossier } from
  "@domain/model/projects/project-dossier";

export interface FindProjectDossiersPort
  extends DomainPort<void, readonly ProjectDossier[]> {}
