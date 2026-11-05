import type { Route } from "./+types/robots";
import { resolveRequestOrigin } from "~/shared/lib/site-origins.server";

export function loader({ request }: Route.LoaderArgs) {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${resolveRequestOrigin(request)}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
