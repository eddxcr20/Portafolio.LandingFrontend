import type { ProjectDossierDocument } from
  "@infrastructure/content/projects/find-project-dossiers-adapter";

export const projectDossierDocuments: readonly ProjectDossierDocument[] =
  Object.values(
    import.meta.glob<ProjectDossierDocument>("./dossiers/*.json", {
      eager: true,
      import: "default",
    }),
  );
