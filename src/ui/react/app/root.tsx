import { I18nextProvider } from "react-i18next";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { readRouteFailure } from "~/app/lib/route-error";
import { resolveDocumentLanguage } from "~/app/lib/route-language";
import { ErrorPage } from "~/pages/error/error-page";
import { PrintPlatesDefs } from "~/shared/components/print-plates-defs";
import { i18nByLanguage } from "~/shared/lib/i18n";
import { usePrintPress } from "~/shared/lib/use-print-press";

export function headers() {
  return {
    "Cache-Control": "no-cache",
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const language = resolveDocumentLanguage(useParams().lang);

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f6f0e1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <PrintPlatesDefs />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  usePrintPress();

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const language = resolveDocumentLanguage(useParams().lang);

  return (
    <I18nextProvider i18n={i18nByLanguage[language]}>
      <ErrorPage language={language} failure={readRouteFailure(error)} />
    </I18nextProvider>
  );
}
