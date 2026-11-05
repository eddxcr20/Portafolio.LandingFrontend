import type { DomainError } from "./domain-error";

type DomainSuccessResult<T> = {
  readonly isSuccess: true;
  readonly error: null;
  readonly value: T;
};

type DomainFailureResult = {
  readonly isSuccess: false;
  readonly error: DomainError;
  readonly value: null;
};

export type DomainResult<T = void> =
  | DomainSuccessResult<T>
  | DomainFailureResult;

const success = <T = void>(value?: T): DomainResult<T> => {
  return {
    isSuccess: true,
    error: null,
    value: value as T,
  };
};

const failure = <T = void>(error: DomainError): DomainResult<T> => {
  return {
    isSuccess: false,
    error,
    value: null,
  };
};

export const DomainResult = {
  success,
  failure,
} as const;
