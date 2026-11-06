import { describe, expect, it } from "vitest";
import tagLabels from "@infrastructure/content/common/tag-labels.json";
import { FindProjectDossiersAdapter } from
  "@infrastructure/content/projects/find-project-dossiers-adapter";
import { projectDossierDocuments } from
  "@infrastructure/content/projects/project-dossier-documents";

describe("FindProjectDossiersAdapter", () => {
  it("should resolve the blog tag of every dossier", async () => {
    const dossiers = await new FindProjectDossiersAdapter(
      projectDossierDocuments,
      tagLabels,
    ).handleAsync();

    expect(dossiers.map((dossier) => dossier.tag.id).sort()).toEqual([
      "grapht",
      "industrialcomplements",
    ]);
  });

  it("should write every dossier in both languages", async () => {
    const dossiers = await new FindProjectDossiersAdapter(
      projectDossierDocuments,
      tagLabels,
    ).handleAsync();

    dossiers.forEach((dossier) =>
      Object.values(dossier.text).forEach((text) => {
        expect(text.summary.length).toBeGreaterThan(0);
        expect(text.pieces.length).toBeGreaterThan(0);
        expect(text.verdict).toBeTruthy();
      }),
    );
  });

  it("should give every dossier a distinct slug and order", () => {
    const slugs = projectDossierDocuments.map((dossier) => dossier.slug);
    const orders = projectDossierDocuments.map((dossier) => dossier.order);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
