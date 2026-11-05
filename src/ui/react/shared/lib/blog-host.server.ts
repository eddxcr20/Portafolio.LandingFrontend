import { redirect } from "react-router";
import type { Language } from "@domain/model/common/language";
import { blogPath } from "~/shared/lib/site-paths";
import { readHost, readRequestHost } from "~/shared/lib/site-origins.server";

const BLOG_PATH = /^\/[a-z]{2}\/blog(\/|$)/;

export const blogHostRedirect = (
  request: Request,
  language: Language,
): Response | null => {
  const blogHost = readHost("BLOG_HOST");

  if (blogHost === null) {
    return null;
  }

  const url = new URL(request.url);
  const isBlogHost = readRequestHost(request) === blogHost;
  const isBlogPath = BLOG_PATH.test(url.pathname);

  if (isBlogHost && !isBlogPath) {
    return redirect(blogPath(language));
  }

  if (!isBlogHost && isBlogPath) {
    return redirect(`https://${blogHost}${url.pathname}${url.search}`, {
      status: 301,
    });
  }

  return null;
};
