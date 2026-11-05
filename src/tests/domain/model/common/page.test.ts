import { describe, expect, it } from "vitest";
import { paginate } from "@domain/model/common/page";

const items = [1, 2, 3, 4, 5];

describe("paginate", () => {
  it("should slice the requested page and count every page", () => {
    expect(paginate(items, 2, 2)).toEqual({
      items: [3, 4],
      number: 2,
      count: 3,
      total: 5,
    });
  });

  it("should keep one empty page when there are no items", () => {
    expect(paginate([], 1, 10)).toEqual({
      items: [],
      number: 1,
      count: 1,
      total: 0,
    });
  });

  it("should reject a page that is not a whole number in range", () => {
    expect(paginate(items, 0, 2)).toBeNull();
    expect(paginate(items, 4, 2)).toBeNull();
    expect(paginate(items, 1.5, 2)).toBeNull();
    expect(paginate(items, Number.NaN, 2)).toBeNull();
  });
});
