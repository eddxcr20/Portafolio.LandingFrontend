import type { DomainPort } from "@domain/common/domain-port";
import type { BlogEntry } from "@domain/model/blog/blog-entry";

export interface FindBlogEntriesPort
  extends DomainPort<void, readonly BlogEntry[]> {}
