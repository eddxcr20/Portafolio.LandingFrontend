import type { DomainError } from "@domain/common/domain-error";

export const blogEntryNotFoundError = (date: string): DomainError => ({
  type: 404,
  description: "blog:errors.entryNotFound",
  value: date,
  statusCode: 404,
});

export const pageNotFoundError = (page: number): DomainError => ({
  type: 404,
  description: "blog:errors.pageNotFound",
  value: String(page),
  statusCode: 404,
});

export const tagNotFoundError = (slug: string): DomainError => ({
  type: 404,
  description: "blog:errors.tagNotFound",
  value: slug,
  statusCode: 404,
});
