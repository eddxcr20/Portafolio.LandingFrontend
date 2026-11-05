export type SiteOrigins = {
  readonly portfolio: string;
  readonly blog: string;
};

type HostVariable = "LANDING_HOST" | "BLOG_HOST";

export const readHost = (variable: HostVariable): string | null =>
  process.env[variable]?.toLowerCase() || null;

export const readRequestHost = (request: Request): string =>
  (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

export const resolveSiteOrigins = (request: Request): SiteOrigins => {
  const landingHost = readHost("LANDING_HOST");
  const blogHost = readHost("BLOG_HOST");
  const portfolio = landingHost === null
    ? new URL(request.url).origin
    : `https://${landingHost}`;

  return {
    portfolio,
    blog: blogHost === null ? portfolio : `https://${blogHost}`,
  };
};

export const isBlogRequest = (request: Request): boolean =>
  readRequestHost(request) === readHost("BLOG_HOST");

export const resolveRequestOrigin = (request: Request): string => {
  const origins = resolveSiteOrigins(request);

  return isBlogRequest(request) ? origins.blog : origins.portfolio;
};
