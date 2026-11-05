import {
  type FindBlogEntriesUseCase,
  UseCase as FindBlogEntries,
} from "@domain/use-cases/blog/find-blog-entries/use-case";
import {
  type FindBlogEntryUseCase,
  UseCase as FindBlogEntry,
} from "@domain/use-cases/blog/find-blog-entry/use-case";
import {
  type FindProjectDossierUseCase,
  UseCase as FindProjectDossier,
} from "@domain/use-cases/projects/find-project-dossier/use-case";
import {
  type FindProjectSlugsUseCase,
  UseCase as FindProjectSlugs,
} from "@domain/use-cases/projects/find-project-slugs/use-case";
import { blogEntryDocuments } from
  "@infrastructure/content/blog/blog-entry-documents";
import { FindBlogEntriesAdapter } from
  "@infrastructure/content/blog/find-blog-entries-adapter";
import tagLabels from "@infrastructure/content/common/tag-labels.json";
import { FindProjectDossiersAdapter } from
  "@infrastructure/content/projects/find-project-dossiers-adapter";
import { projectDossierDocuments } from
  "@infrastructure/content/projects/project-dossier-documents";

type PublicContainer = {
  readonly findBlogEntries: FindBlogEntriesUseCase;
  readonly findBlogEntry: FindBlogEntryUseCase;
  readonly findProjectDossier: FindProjectDossierUseCase;
  readonly findProjectSlugs: FindProjectSlugsUseCase;
};

const findBlogEntries = new FindBlogEntriesAdapter(
  blogEntryDocuments,
  tagLabels,
);
const findProjectDossiers = new FindProjectDossiersAdapter(
  projectDossierDocuments,
  tagLabels,
);

export const publicContainer: PublicContainer = {
  findBlogEntries: new FindBlogEntries(findBlogEntries),
  findBlogEntry: new FindBlogEntry(findBlogEntries),
  findProjectDossier: new FindProjectDossier(
    findProjectDossiers,
    findBlogEntries,
  ),
  findProjectSlugs: new FindProjectSlugs(findProjectDossiers),
};
