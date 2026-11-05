import { describe, expect, it, vi } from "vitest";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import type { FindProjectDossiersPort } from
  "@domain/model/projects/ports/find-project-dossiers-port";
import { UseCase } from
  "@domain/use-cases/projects/find-project-dossier/use-case";
import { blogEntry, graphtTag } from "@tests/support/blog-fixtures";
import { graphtDossier } from "@tests/support/project-fixtures";

const dossiersPort: FindProjectDossiersPort = {
  handleAsync: vi.fn().mockResolvedValue([graphtDossier]),
};

const entriesPort: FindBlogEntriesPort = {
  handleAsync: vi.fn().mockResolvedValue([
    blogEntry("2026-09-01", [graphtTag]),
    blogEntry("2026-09-02", []),
    blogEntry("2026-09-03", [graphtTag]),
    blogEntry("2026-09-04", [graphtTag]),
    blogEntry("2026-09-05", [graphtTag]),
    blogEntry("2026-09-06", [graphtTag]),
  ]),
};

describe("FindProjectDossierUseCase", () => {
  it("should resolve the dossier in the requested language", async () => {
    const result = await new UseCase(dossiersPort, entriesPort)
      .handleAsync({ language: "en", slug: "grapht" });

    expect(result.value?.dossier.name).toBe("GraphT");
    expect(result.value?.dossier.verdict).toBe("verdict en");
    expect(result.value?.dossier.tagSlug).toBe("grapht");
  });

  it("should feature the four newest entries of the project", async () => {
    const result = await new UseCase(dossiersPort, entriesPort)
      .handleAsync({ language: "es", slug: "grapht" });

    expect(result.value?.featuredEntries.map((entry) => entry.date))
      .toEqual(["2026-09-06", "2026-09-05", "2026-09-04", "2026-09-03"]);
  });

  it("should fail with not found when the slug is unknown", async () => {
    const unusedEntriesPort: FindBlogEntriesPort = { handleAsync: vi.fn() };

    const result = await new UseCase(dossiersPort, unusedEntriesPort)
      .handleAsync({ language: "es", slug: "ic" });

    expect(result.isSuccess).toBe(false);
    expect(result.error?.description).toBe("dossier:errors.projectNotFound");
    expect(unusedEntriesPort.handleAsync).not.toHaveBeenCalled();
  });
});
