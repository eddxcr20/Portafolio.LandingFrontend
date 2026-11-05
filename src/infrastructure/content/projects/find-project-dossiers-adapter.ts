import type { FindProjectDossiersPort } from
  "@domain/model/projects/ports/find-project-dossiers-port";
import type {
  ProjectDossier,
  ProjectDossierText,
} from "@domain/model/projects/project-dossier";
import { type TagLabelsDocument, toTag } from
  "@infrastructure/content/common/tag-labels";

export type ProjectDossierDocument = {
  readonly slug: string;
  readonly name: string;
  readonly order: number;
  readonly link: string;
  readonly leadImage: string;
  readonly closingImage: string;
  readonly tag: string;
  readonly es: ProjectDossierText;
  readonly en: ProjectDossierText;
};

const toProjectDossier = (
  document: ProjectDossierDocument,
  labels: TagLabelsDocument,
): ProjectDossier => ({
  slug: document.slug,
  name: document.name,
  order: document.order,
  link: document.link,
  leadImage: document.leadImage,
  closingImage: document.closingImage,
  tag: toTag(document.tag, labels),
  text: { es: document.es, en: document.en },
});

export class FindProjectDossiersAdapter implements FindProjectDossiersPort {
  private readonly dossiers: readonly ProjectDossier[];

  constructor(
    documents: readonly ProjectDossierDocument[],
    labels: TagLabelsDocument,
  ) {
    this.dossiers = documents.map((document) =>
      toProjectDossier(document, labels),
    );
  }

  async handleAsync(): Promise<readonly ProjectDossier[]> {
    return this.dossiers;
  }
}
