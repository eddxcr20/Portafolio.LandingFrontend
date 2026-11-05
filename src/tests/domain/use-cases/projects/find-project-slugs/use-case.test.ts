import { describe, expect, it, vi } from "vitest";
import type { FindProjectDossiersPort } from
  "@domain/model/projects/ports/find-project-dossiers-port";
import { UseCase } from
  "@domain/use-cases/projects/find-project-slugs/use-case";
import { graphtDossier } from "@tests/support/project-fixtures";

describe("FindProjectSlugsUseCase", () => {
  it("should return the slug of every dossier", async () => {
    const port: FindProjectDossiersPort = {
      handleAsync: vi.fn().mockResolvedValue([graphtDossier]),
    };

    const result = await new UseCase(port).handleAsync();

    expect(result.value?.slugs).toEqual(["grapht"]);
  });
});
