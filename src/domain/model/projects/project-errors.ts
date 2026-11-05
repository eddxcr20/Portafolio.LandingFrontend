import type { DomainError } from "@domain/common/domain-error";

export const projectNotFoundError = (slug: string): DomainError => ({
  type: 404,
  description: "dossier:errors.projectNotFound",
  value: slug,
  statusCode: 404,
});
