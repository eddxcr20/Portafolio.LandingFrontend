export type DomainError = {
  readonly type: number;
  readonly description: string;
  readonly value?: string | null;
  readonly statusCode?: number;
};

const isDomainError = (value: unknown): value is DomainError => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "type" in value && "description" in value;
};

export const toDomainError = (error: unknown): DomainError => {
  if (isDomainError(error)) {
    return error;
  }

  return {
    type: 500,
    description: "common:errors.unexpected",
    value: null,
    statusCode: 500,
  };
};
