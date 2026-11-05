import { describe, expect, it } from "vitest";
import { toTagSlug, toTagSlugs, viewTag } from "@domain/model/blog/tag";
import { gamificationTag } from "@tests/support/blog-fixtures";

describe("toTagSlug", () => {
  it("should keep one lowercase word when the label is camel case", () => {
    expect(toTagSlug("ClaudeCode")).toBe("claudecode");
  });

  it("should drop accents and symbols when the label has them", () => {
    expect(toTagSlug("DiseñoDeProducto")).toBe("disenodeproducto");
    expect(toTagSlug("Gamificación")).toBe("gamificacion");
    expect(toTagSlug(".NET")).toBe("net");
  });
});

describe("viewTag", () => {
  it("should resolve the label and slug of the requested language", () => {
    expect(viewTag(gamificationTag, "es")).toEqual({
      slug: "gamificacion",
      label: "Gamificación",
    });
    expect(viewTag(gamificationTag, "en")).toEqual({
      slug: "gamification",
      label: "Gamification",
    });
  });
});

describe("toTagSlugs", () => {
  it("should return the slug of every language", () => {
    expect(toTagSlugs(gamificationTag)).toEqual({
      es: "gamificacion",
      en: "gamification",
    });
  });
});
