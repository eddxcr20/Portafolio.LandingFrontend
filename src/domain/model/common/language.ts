export const LANGUAGES = ["es", "en"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "es";

export const isLanguage = (value: string): value is Language =>
  LANGUAGES.some((language) => language === value);
