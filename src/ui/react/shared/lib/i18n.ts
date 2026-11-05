import i18next, { type i18n as I18n } from "i18next";
import type { Language } from "@domain/model/common/language";
import { DEFAULT_LANGUAGE } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import enBlog from "~/shared/locales/en/blog.json";
import enCommon from "~/shared/locales/en/common.json";
import enDossier from "~/shared/locales/en/dossier.json";
import enHome from "~/shared/locales/en/home.json";
import esBlog from "~/shared/locales/es/blog.json";
import esCommon from "~/shared/locales/es/common.json";
import esDossier from "~/shared/locales/es/dossier.json";
import esHome from "~/shared/locales/es/home.json";

const NAMESPACES = ["common", "home", "dossier", "blog"];

const resources = {
  es: { common: esCommon, home: esHome, dossier: esDossier, blog: esBlog },
  en: { common: enCommon, home: enHome, dossier: enDossier, blog: enBlog },
};

const createI18n = (language: Language): I18n => {
  const instance = i18next.createInstance();

  instance.init({
    resources,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: NAMESPACES,
    defaultNS: "common",
    interpolation: { escapeValue: false },
    initAsync: false,
  });

  return instance;
};

export const i18nByLanguage: Localized<I18n> = {
  es: createI18n("es"),
  en: createI18n("en"),
};
