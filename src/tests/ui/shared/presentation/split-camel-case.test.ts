import { describe, expect, it } from "vitest";
import { splitCamelCase } from "~/shared/presentation/split-camel-case";

describe("splitCamelCase", () => {
  it("should split where a lowercase letter meets an uppercase one", () => {
    expect(splitCamelCase("ArquitecturaDeSoftware"))
      .toEqual(["Arquitectura", "De", "Software"]);
    expect(splitCamelCase("DiseñoDeProducto"))
      .toEqual(["Diseño", "De", "Producto"]);
  });

  it("should keep runs of capitals together when there is no boundary", () => {
    expect(splitCamelCase("APIs")).toEqual(["APIs"]);
    expect(splitCamelCase("UX")).toEqual(["UX"]);
  });
});
