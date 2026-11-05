import type { Language } from "@domain/model/common/language";
import { LOCALES } from "~/shared/presentation/locale";

export const formatEntryDate = (date: string, language: Language): string =>
  new Intl.DateTimeFormat(LOCALES[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
