import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";

export type Tag = {
  readonly id: string;
  readonly label: Localized<string>;
};

export type TagView = {
  readonly slug: string;
  readonly label: string;
};

export const toTagSlug = (label: string): string =>
  label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export const toTagSlugs = (tag: Tag): Localized<string> => ({
  es: toTagSlug(tag.label.es),
  en: toTagSlug(tag.label.en),
});

export const viewTag = (tag: Tag, language: Language): TagView => ({
  slug: toTagSlug(tag.label[language]),
  label: tag.label[language],
});
