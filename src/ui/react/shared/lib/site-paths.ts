import type { Language } from "@domain/model/common/language";

export const homePath = (language: Language): string => `/${language}`;

export const dossierPath = (language: Language, slug: string): string =>
  `/${language}/projects/${slug}`;

export const blogPath = (language: Language): string =>
  `/${language}/blog`;

export const pagedPath = (path: string, page: number): string =>
  page === 1 ? path : `${path}?page=${page}`;

export const blogTagPath = (language: Language, tagSlug: string): string =>
  `${blogPath(language)}/tags/${tagSlug}`;

export const blogEntryPath = (language: Language, date: string): string =>
  `${blogPath(language)}/${date}`;
