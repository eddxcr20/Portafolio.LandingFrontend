import { data } from "react-router";
import {
  DEFAULT_LANGUAGE,
  type Language,
  isLanguage,
} from "@domain/model/common/language";

export const readRouteLanguage = (value: string | undefined): Language => {
  if (value === undefined || !isLanguage(value)) {
    throw data(null, { status: 404 });
  }

  return value;
};

export const resolveDocumentLanguage = (
  value: string | undefined,
): Language =>
  value !== undefined && isLanguage(value) ? value : DEFAULT_LANGUAGE;
