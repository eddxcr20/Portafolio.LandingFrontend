import { redirect } from "react-router";
import type { Route } from "./+types/root-redirect";
import { blogHostRedirect } from "~/shared/lib/blog-host.server";
import { resolvePreferredLanguage } from
  "~/shared/lib/language-preference.server";
import { homePath } from "~/shared/lib/site-paths";

export function loader({ request }: Route.LoaderArgs) {
  const language = resolvePreferredLanguage(request);

  return blogHostRedirect(request, language) ?? redirect(homePath(language));
}

export default function RootRedirect() {
  return null;
}
