import {
  DEFAULT_LANGUAGE,
  type Language,
  isLanguage,
} from "@domain/model/common/language";

const COOKIE_NAME = "lang";
const ONE_YEAR_IN_SECONDS = 31_536_000;

const readLanguageCookie = (request: Request): Language | null => {
  const value = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((pair) => pair.trim().split("="))
    .find(([name]) => name === COOKIE_NAME)?.[1];

  return value !== undefined && isLanguage(value) ? value : null;
};

const readAcceptedLanguage = (request: Request): Language | null =>
  (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((range) => range.trim().split(";")[0].split("-")[0].toLowerCase())
    .find(isLanguage) ?? null;

export const resolvePreferredLanguage = (request: Request): Language =>
  readLanguageCookie(request) ??
  readAcceptedLanguage(request) ??
  DEFAULT_LANGUAGE;

export const serializeLanguageCookie = (language: Language): string => {
  const domain = process.env.COOKIE_DOMAIN;
  const attributes = [
    `${COOKIE_NAME}=${language}`,
    "Path=/",
    `Max-Age=${ONE_YEAR_IN_SECONDS}`,
    "SameSite=Lax",
  ];

  return [...attributes, ...(domain ? [`Domain=${domain}`] : [])].join("; ");
};
