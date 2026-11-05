import type {
  ProjectDossier,
  ProjectDossierText,
} from "@domain/model/projects/project-dossier";
import { graphtTag } from "@tests/support/blog-fixtures";

const dossierText = (language: string): ProjectDossierText => ({
  label: `label ${language}`,
  meta: `meta ${language}`,
  summary: [`summary ${language}`],
  problem: [`problem ${language}`],
  understanding: [`understanding ${language}`],
  decisions: [`decisions ${language}`],
  state: [`state ${language}`],
  pieces: [{ title: `piece ${language}.`, text: `text ${language}` }],
  verdict: `verdict ${language}`,
  closing: [`closing ${language}`],
  leadFigure: { caption: `lead ${language}`, alt: `lead alt ${language}` },
  closingFigure: {
    caption: `closing ${language}`,
    alt: `closing alt ${language}`,
  },
});

export const graphtDossier: ProjectDossier = {
  slug: "grapht",
  name: "GraphT",
  order: 1,
  link: "https://grapht.com.mx",
  leadImage: "/images/lead.webp",
  closingImage: "/images/closing.webp",
  tag: graphtTag,
  text: { es: dossierText("es"), en: dossierText("en") },
};
