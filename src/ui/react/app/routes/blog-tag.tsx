import type { Route } from "./+types/blog-tag";
import { loadBlogList } from "~/app/lib/load-blog-list.server";
import { buildPageMeta } from "~/app/lib/page-meta";
import { readRouteLanguage } from "~/app/lib/route-language";
import { BlogListPage } from "~/pages/blog-list/blog-list-page";

export async function loader({ params, request }: Route.LoaderArgs) {
  return loadBlogList(request, readRouteLanguage(params.lang), params.tag);
}

export function meta({ loaderData }: Route.MetaArgs) {
  return buildPageMeta(loaderData?.meta);
}

export default function BlogTagRoute({ loaderData }: Route.ComponentProps) {
  return <BlogListPage {...loaderData} />;
}
