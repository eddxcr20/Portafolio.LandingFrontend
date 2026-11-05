import { describe, expect, it } from "vitest";
import { blogEntryDocuments } from
  "@infrastructure/content/blog/blog-entry-documents";
import {
  type BlogEntryDocument,
  FindBlogEntriesAdapter,
} from "@infrastructure/content/blog/find-blog-entries-adapter";
import tagLabels from "@infrastructure/content/common/tag-labels.json";
import { toTagSlug } from "@domain/model/blog/tag";

const document: BlogEntryDocument = {
  date: "2026-09-12",
  tags: ["grapht", "adhd"],
  es: { title: "Título", topic: "Tema", body: ["Uno", ["a", "b"]] },
  en: { title: "Title", topic: "Topic", body: ["One"] },
};

const labels = {
  grapht: { es: "GraphT", en: "GraphT" },
  adhd: { es: "TDAH", en: "ADHD" },
};

describe("FindBlogEntriesAdapter", () => {
  it("should map strings to paragraphs and arrays to lists", async () => {
    const [entry] = await new FindBlogEntriesAdapter([document], labels)
      .handleAsync();

    expect(entry.text.es.body).toEqual([
      { kind: "paragraph", text: "Uno" },
      { kind: "list", items: ["a", "b"] },
    ]);
    expect(entry.text.en.title).toBe("Title");
  });

  it("should resolve every tag with its labels", async () => {
    const [entry] = await new FindBlogEntriesAdapter([document], labels)
      .handleAsync();

    expect(entry.tags).toEqual([
      { id: "grapht", label: { es: "GraphT", en: "GraphT" } },
      { id: "adhd", label: { es: "TDAH", en: "ADHD" } },
    ]);
  });

  it("should reject a tag without labels", () => {
    const unknown = { ...document, tags: ["unknown"] };

    expect(() => new FindBlogEntriesAdapter([unknown], labels))
      .toThrow("Unknown tag unknown");
  });
});

describe("blog catalog", () => {
  const entries = new FindBlogEntriesAdapter(blogEntryDocuments, tagLabels);

  it("should give every entry its own valid date", () => {
    const dates = blogEntryDocuments.map((entry) => entry.date);

    expect(new Set(dates).size).toBe(dates.length);
    dates.forEach((date) => {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${date}T00:00:00Z`).toISOString()).toContain(date);
    });
  });

  it("should write every entry in both languages", async () => {
    const all = await entries.handleAsync();

    all.forEach((entry) =>
      Object.values(entry.text).forEach((text) => {
        expect(text.title, entry.date).toBeTruthy();
        expect(text.topic, entry.date).toBeTruthy();
        expect(text.body.length, entry.date).toBeGreaterThan(0);
      }),
    );
  });

  it("should give every tag a distinct slug in each language", () => {
    const labelsByLanguage = ["es", "en"] as const;

    labelsByLanguage.forEach((language) => {
      const slugs = Object.values(tagLabels).map((label) =>
        toTagSlug(label[language]),
      );

      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  it("should only keep labels that some entry uses", () => {
    const used = new Set(blogEntryDocuments.flatMap((entry) => entry.tags));

    expect(Object.keys(tagLabels).filter((tag) => !used.has(tag)))
      .toEqual([]);
  });
});
