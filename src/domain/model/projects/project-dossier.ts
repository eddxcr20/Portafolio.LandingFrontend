import type { Tag } from "@domain/model/blog/tag";
import type { Localized } from "@domain/model/common/localized";

export type ProjectPiece = {
  readonly title: string;
  readonly text: string;
};

type ProjectFigureText = {
  readonly caption: string;
  readonly alt: string;
};

export type ProjectDossierText = {
  readonly label: string;
  readonly meta: string;
  readonly summary: readonly string[];
  readonly problem: readonly string[];
  readonly understanding: readonly string[];
  readonly decisions: readonly string[];
  readonly state: readonly string[];
  readonly pieces: readonly ProjectPiece[];
  readonly verdict: string;
  readonly closing: readonly string[];
  readonly leadFigure: ProjectFigureText;
  readonly closingFigure: ProjectFigureText;
};

export type ProjectDossier = {
  readonly slug: string;
  readonly name: string;
  readonly order: number;
  readonly link: string;
  readonly leadImage: string;
  readonly closingImage: string;
  readonly tag: Tag;
  readonly text: Localized<ProjectDossierText>;
};

export type ProjectDossierView = ProjectDossierText & {
  readonly slug: string;
  readonly name: string;
  readonly order: number;
  readonly link: string;
  readonly leadImage: string;
  readonly closingImage: string;
  readonly tagSlug: string;
};
