import type { BlogEntryDocument } from
  "@infrastructure/content/blog/find-blog-entries-adapter";

export const blogEntryDocuments: readonly BlogEntryDocument[] = Object.values(
  import.meta.glob<BlogEntryDocument>("./entries/*.json", {
    eager: true,
    import: "default",
  }),
);
