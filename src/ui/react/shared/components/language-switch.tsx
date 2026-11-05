import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LANGUAGES, type Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { joinClassNames } from "~/shared/lib/join-class-names";

type LanguageSwitchProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
};

export function LanguageSwitch({ language, alternates }: LanguageSwitchProps) {
  const { t } = useTranslation("common");

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className="inline-flex overflow-hidden rounded-xs border border-divider"
    >
      {LANGUAGES.map((option, index) => (
        <Link
          key={option}
          to={alternates[option]}
          hrefLang={option}
          lang={option}
          aria-current={option === language ? "true" : undefined}
          className={joinClassNames(
            "flex h-8 items-center px-3 text-caption no-underline",
            "focus-visible:-outline-offset-2",
            index > 0 && "border-l border-divider",
            option === language
              ? "bg-accent text-paper hover:text-paper"
              : "text-ink hover:bg-hover-ink hover:text-ink",
          )}
        >
          {t(`language.${option}`)}
        </Link>
      ))}
    </div>
  );
}
