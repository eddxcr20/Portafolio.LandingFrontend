import type { Route } from "./+types/sitemap";
import { type SitemapUrl, collectSitemapUrls } from
  "~/app/lib/sitemap.server";
import {
  isBlogRequest,
  readHost,
  resolveRequestOrigin,
} from "~/shared/lib/site-origins.server";

const toUrlElement = (origin: string, url: SitemapUrl): string => {
  const lastModified = url.lastModified === null
    ? ""
    : `<lastmod>${url.lastModified}</lastmod>`;

  return `  <url><loc>${origin}${url.path}</loc>${lastModified}</url>`;
};

export async function loader({ request }: Route.LoaderArgs) {
  const hasBlogHost = readHost("BLOG_HOST") !== null;
  const isBlog = isBlogRequest(request);
  const origin = resolveRequestOrigin(request);
  const urls = await collectSitemapUrls(!isBlog, isBlog || !hasBlogHost);
  const body = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...urls.map((url) => toUrlElement(origin, url)),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
