export const formatLinkLabel = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");
