import type { Language } from "@domain/model/common/language";
import { formatEntryDate } from "~/shared/presentation/format-entry-date";

type EntryDateProps = {
  readonly date: string;
  readonly language: Language;
};

export function EntryDate({ date, language }: EntryDateProps) {
  return (
    <time dateTime={date} className="block text-label uppercase">
      {formatEntryDate(date, language)}
    </time>
  );
}
