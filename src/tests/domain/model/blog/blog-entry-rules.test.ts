import { describe, expect, it } from "vitest";
import {
  countTags,
  findAdjacentEntries,
  findTagBySlug,
  selectLatestTagged,
  sortNewestFirst,
  summarizeEntry,
  toArticle,
} from "@domain/model/blog/blog-entry-rules";
import {
  adhdTag,
  blogEntries,
  gamificationTag,
  graphtTag,
  middleEntry,
  newestEntry,
  oldestEntry,
} from "@tests/support/blog-fixtures";

describe("sortNewestFirst", () => {
  it("should order the entries from the newest to the oldest", () => {
    expect(sortNewestFirst(blogEntries)).toEqual([
      newestEntry,
      middleEntry,
      oldestEntry,
    ]);
  });
});

describe("countTags", () => {
  it("should order the tags by frequency and then by label", () => {
    expect(countTags(blogEntries, "en")).toEqual([
      { tag: { slug: "grapht", label: "GraphT" }, count: 3 },
      { tag: { slug: "adhd", label: "ADHD" }, count: 2 },
      { tag: { slug: "gamification", label: "Gamification" }, count: 1 },
    ]);
  });
});

describe("findTagBySlug", () => {
  it("should find the tag by the slug of the requested language", () => {
    expect(findTagBySlug(blogEntries, "tdah", "es")).toEqual(adhdTag);
    expect(findTagBySlug(blogEntries, "adhd", "en")).toEqual(adhdTag);
  });

  it("should return null when the slug belongs to another language", () => {
    expect(findTagBySlug(blogEntries, "adhd", "es")).toBeNull();
  });
});

describe("findAdjacentEntries", () => {
  it("should return the older entry as previous and the newer as next", () => {
    expect(findAdjacentEntries(blogEntries, middleEntry)).toEqual({
      previous: oldestEntry,
      next: newestEntry,
    });
  });

  it("should return null when the entry is at an end of the timeline", () => {
    expect(findAdjacentEntries(blogEntries, oldestEntry).previous).toBeNull();
    expect(findAdjacentEntries(blogEntries, newestEntry).next).toBeNull();
  });
});

describe("selectLatestTagged", () => {
  it("should keep only the newest entries with the tag", () => {
    expect(selectLatestTagged(blogEntries, adhdTag, 1)).toEqual([
      newestEntry,
    ]);
    expect(selectLatestTagged(blogEntries, graphtTag, 4)).toHaveLength(3);
  });

  it("should return nothing when no entry has the tag", () => {
    const tagged = selectLatestTagged([oldestEntry], gamificationTag, 4);

    expect(tagged).toEqual([]);
  });
});

describe("summarizeEntry", () => {
  it("should resolve the texts and tags of the requested language", () => {
    expect(summarizeEntry(middleEntry, "es")).toEqual({
      date: "2026-09-12",
      title: "Entrada 2026-09-12",
      topic: "Entrada 2026-09-12 topic",
      tags: [
        { slug: "grapht", label: "GraphT" },
        { slug: "tdah", label: "TDAH" },
      ],
    });
  });
});

describe("toArticle", () => {
  it("should add the body of the requested language", () => {
    expect(toArticle(oldestEntry, "en").body).toEqual(
      oldestEntry.text.en.body,
    );
  });
});
