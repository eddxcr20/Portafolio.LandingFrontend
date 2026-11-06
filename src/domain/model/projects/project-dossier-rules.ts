import type { Language } from "@domain/model/common/language";
import { toTagSlug } from "@domain/model/blog/tag";
import type {
  ProjectDossier,
  ProjectDossierView,
} from "@domain/model/projects/project-dossier";

export const viewDossier = (
  dossier: ProjectDossier,
  language: Language,
): ProjectDossierView => ({
  ...dossier.text[language],
  slug: dossier.slug,
  name: dossier.name,
  order: dossier.order,
  status: dossier.status,
  link: dossier.link,
  leadImage: dossier.leadImage,
  closingImage: dossier.closingImage,
  tagSlug: toTagSlug(dossier.tag.label[language]),
});
