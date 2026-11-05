import { I18nextProvider } from "react-i18next";
import { Outlet, data } from "react-router";
import type { Route } from "./+types/lang-layout";
import { readRouteFailure } from "~/app/lib/route-error";
import {
  readRouteLanguage,
  resolveDocumentLanguage,
} from "~/app/lib/route-language";
import { ErrorPage } from "~/pages/error/error-page";
import { blogHostRedirect } from "~/shared/lib/blog-host.server";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { serializeLanguageCookie } from
  "~/shared/lib/language-preference.server";

export function loader({ params, request }: Route.LoaderArgs) {
  const language = readRouteLanguage(params.lang);
  const hostRedirect = blogHostRedirect(request, language);

  if (hostRedirect !== null) {
    return hostRedirect;
  }

  return data(
    { language },
    { headers: { "Set-Cookie": serializeLanguageCookie(language) } },
  );
}

export default function LangLayout({ loaderData }: Route.ComponentProps) {
  return (
    <I18nextProvider i18n={i18nByLanguage[loaderData.language]}>
      <Outlet />
    </I18nextProvider>
  );
}

export function ErrorBoundary({ error, params }: Route.ErrorBoundaryProps) {
  const language = resolveDocumentLanguage(params.lang);

  return (
    <I18nextProvider i18n={i18nByLanguage[language]}>
      <ErrorPage language={language} failure={readRouteFailure(error)} />
    </I18nextProvider>
  );
}
