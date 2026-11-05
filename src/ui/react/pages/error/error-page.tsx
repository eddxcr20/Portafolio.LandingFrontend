import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Language } from "@domain/model/common/language";
import type { RouteFailure } from "~/pages/error/model/route-failure";
import { BrandLogo } from "~/shared/components/brand-logo";
import { homePath } from "~/shared/lib/site-paths";

type ErrorPageProps = {
  readonly language: Language;
  readonly failure: RouteFailure;
};

const NOT_FOUND_STATUS = 404;

export function ErrorPage({ language, failure }: ErrorPageProps) {
  const { t } = useTranslation("common");
  const title = failure.status === NOT_FOUND_STATUS
    ? t("errorScreen.notFoundTitle")
    : t("errorScreen.unexpectedTitle");

  return (
    <main
      className="@container mx-auto grid max-w-page gap-8 px-gutter pt-16
        pb-28 text-body"
    >
      <Link
        to={homePath(language)}
        aria-label={t("brand.home")}
        className="block w-fit"
      >
        <BrandLogo />
      </Link>
      <h1 className="-ml-[0.04em] text-stairs">{title}</h1>
      <p className="max-w-[48ch] text-lead text-ink-2">
        {t(failure.description, { value: failure.value ?? undefined })}
      </p>
      <p className="text-secondary">
        <Link to={homePath(language)}>{t("errorScreen.back")}</Link>
      </p>
    </main>
  );
}
