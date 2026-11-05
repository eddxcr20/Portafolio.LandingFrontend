import type { Language } from "@domain/model/common/language";

export type Localized<T> = Readonly<Record<Language, T>>;
