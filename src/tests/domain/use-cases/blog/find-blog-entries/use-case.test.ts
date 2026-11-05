import { describe, expect, it, vi } from "vitest";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import { UseCase } from "@domain/use-cases/blog/find-blog-entries/use-case";
import {
  blogEntries,
  blogEntry,
  graphtTag,
} from "@tests/support/blog-fixtures";

const manyEntries = Array.from({ length: 23 }, (_, index) =>
  blogEntry(`2026-09-${String(index + 1).padStart(2, "0")}`, [graphtTag]),
);

const portReturning = (
  entries: typeof blogEntries,
): FindBlogEntriesPort => ({
  handleAsync: vi.fn().mockResolvedValue(entries),
});

describe("FindBlogEntriesUseCase", () => {
  it("should list every entry newest first when there is no tag", async () => {
    const result = await new UseCase(portReturning(blogEntries))
      .handleAsync({ language: "es", tagSlug: null, page: 1 });

    expect(result.value?.entries.map((entry) => entry.date)).toEqual([
      "2026-10-20",
      "2026-09-12",
      "2026-08-01",
    ]);
    expect(result.value?.activeTag).toBeNull();
    expect(result.value?.tags[0]).toEqual({
      tag: { slug: "grapht", label: "GraphT" },
      count: 3,
    });
  });

  it("should keep only the tagged entries when the tag exists", async () => {
    const result = await new UseCase(portReturning(blogEntries))
      .handleAsync({ language: "es", tagSlug: "tdah", page: 1 });

    expect(result.value?.entries.map((entry) => entry.date)).toEqual([
      "2026-10-20",
      "2026-09-12",
    ]);
    expect(result.value?.activeTag).toEqual({
      label: "TDAH",
      slugs: { es: "tdah", en: "adhd" },
    });
    expect(result.value?.tags).toHaveLength(3);
  });

  it("should fail with tag not found when no entry has the tag", async () => {
    const result = await new UseCase(portReturning(blogEntries))
      .handleAsync({ language: "en", tagSlug: "tdah", page: 1 });

    expect(result.isSuccess).toBe(false);
    expect(result.error?.description).toBe("blog:errors.tagNotFound");
    expect(result.error?.statusCode).toBe(404);
  });

  it("should fail as unexpected when the port throws", async () => {
    const port: FindBlogEntriesPort = {
      handleAsync: vi.fn().mockRejectedValue(new Error("boom")),
    };

    const result = await new UseCase(port)
      .handleAsync({ language: "es", tagSlug: null, page: 1 });

    expect(result.error?.description).toBe("common:errors.unexpected");
  });

  it("should return ten entries per page with the page count", async () => {
    const result = await new UseCase(portReturning(manyEntries))
      .handleAsync({ language: "es", tagSlug: null, page: 1 });

    expect(result.value?.entries).toHaveLength(10);
    expect(result.value?.entries[0].date).toBe("2026-09-23");
    expect(result.value?.totalEntries).toBe(23);
    expect(result.value?.pageCount).toBe(3);
  });

  it("should return the remaining entries on the last page", async () => {
    const result = await new UseCase(portReturning(manyEntries))
      .handleAsync({ language: "es", tagSlug: "grapht", page: 3 });

    expect(result.value?.page).toBe(3);
    expect(result.value?.entries.map((entry) => entry.date))
      .toEqual(["2026-09-03", "2026-09-02", "2026-09-01"]);
  });

  it("should fail with not found when the page is out of range", async () => {
    const result = await new UseCase(portReturning(manyEntries))
      .handleAsync({ language: "es", tagSlug: null, page: 4 });

    expect(result.error?.description).toBe("blog:errors.pageNotFound");
    expect(result.error?.value).toBe("4");
  });
});
