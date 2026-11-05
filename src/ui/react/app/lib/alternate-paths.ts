import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";

export const alternatePaths = (
  toPath: (language: Language) => string,
): Localized<string> => ({
  es: toPath("es"),
  en: toPath("en"),
});
