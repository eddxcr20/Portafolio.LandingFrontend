import { describe, expect, it, vi } from "vitest";
import type { FindBlogEntriesPort } from
  "@domain/model/blog/ports/find-blog-entries-port";
import { UseCase } from "@domain/use-cases/blog/find-blog-entry/use-case";
import { blogEntries } from "@tests/support/blog-fixtures";

const port: FindBlogEntriesPort = {
  handleAsync: vi.fn().mockResolvedValue(blogEntries),
};

describe("FindBlogEntryUseCase", () => {
  it("should return the article and its neighbours when found", async () => {
    const result = await new UseCase(port)
      .handleAsync({ language: "en", date: "2026-09-12" });

    expect(result.value?.entry.title).toBe("Entry 2026-09-12");
    expect(result.value?.entry.body).toEqual([
      { kind: "paragraph", text: "Entry 2026-09-12 body" },
      { kind: "list", items: ["Entry 2026-09-12 item"] },
    ]);
    expect(result.value?.previousDate).toBe("2026-08-01");
    expect(result.value?.nextDate).toBe("2026-10-20");
  });

  it("should leave out the neighbour when the entry is an end", async () => {
    const result = await new UseCase(port)
      .handleAsync({ language: "es", date: "2026-10-20" });

    expect(result.value?.previousDate).toBe("2026-09-12");
    expect(result.value?.nextDate).toBeNull();
  });

  it("should fail with not found when no entry has the date", async () => {
    const result = await new UseCase(port)
      .handleAsync({ language: "es", date: "2026-01-01" });

    expect(result.isSuccess).toBe(false);
    expect(result.error?.description).toBe("blog:errors.entryNotFound");
    expect(result.error?.value).toBe("2026-01-01");
  });
});
