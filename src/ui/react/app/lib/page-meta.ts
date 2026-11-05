import type { MetaDescriptor } from "react-router";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  type Language,
} from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { LOCALES } from "~/shared/presentation/locale";

export type PageMeta = {
  readonly title: string;
  readonly description: string;
  readonly language: Language;
  readonly type: "website" | "article";
  readonly url: string;
  readonly alternateUrls: Localized<string>;
};

const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

const ogImageUrl = (meta: PageMeta): string =>
  `${new URL(meta.url).origin}/og-image-${meta.language}.png`;

export const toAbsoluteUrls = (
  origin: string,
  paths: Localized<string>,
): Localized<string> => ({
  es: `${origin}${paths.es}`,
  en: `${origin}${paths.en}`,
});

export const buildPageMeta = (
  meta: PageMeta | undefined,
): MetaDescriptor[] => {
  if (meta === undefined) {
    return [];
  }

  const image = ogImageUrl(meta);

  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    { name: "robots", content: "index, follow" },
    { tagName: "link", rel: "canonical", href: meta.url },
    ...LANGUAGES.map((language) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: language,
      href: meta.alternateUrls[language],
    })),
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: meta.alternateUrls[DEFAULT_LANGUAGE],
    },
    { property: "og:type", content: meta.type },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:url", content: meta.url },
    {
      property: "og:locale",
      content: LOCALES[meta.language].replace("-", "_"),
    },
    { property: "og:image", content: image },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: image },
    { name: "twitter:title", content: meta.title },
    { name: "twitter:description", content: meta.description },
  ];
};
