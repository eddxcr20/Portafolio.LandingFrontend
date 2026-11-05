import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.tsx"),
  route("robots.txt", "routes/robots.ts"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route(":lang", "routes/lang-layout.tsx", [
    index("routes/home.tsx"),
    route("projects/:slug", "routes/project-dossier.tsx"),
    route("blog", "routes/blog.tsx"),
    route("blog/tags/:tag", "routes/blog-tag.tsx"),
    route("blog/:date", "routes/blog-entry.tsx"),
  ]),
] satisfies RouteConfig;
