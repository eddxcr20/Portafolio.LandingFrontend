import { data, isRouteErrorResponse } from "react-router";
import type { DomainError } from "@domain/common/domain-error";
import type { RouteFailure } from "~/pages/error/model/route-failure";

type RouteFailureData = Omit<RouteFailure, "status">;

const NOT_FOUND_STATUS = 404;
const UNEXPECTED_STATUS = 500;

export const toRouteError = (error: DomainError) =>
  data<RouteFailureData>(
    { description: error.description, value: error.value ?? null },
    { status: error.statusCode ?? UNEXPECTED_STATUS },
  );

const isFailureData = (value: unknown): value is RouteFailureData =>
  typeof value === "object" && value !== null && "description" in value;

const fallbackDescription = (status: number): string =>
  status === NOT_FOUND_STATUS
    ? "common:errors.notFound"
    : "common:errors.unexpected";

export const readRouteFailure = (error: unknown): RouteFailure => {
  if (isRouteErrorResponse(error) && isFailureData(error.data)) {
    return { status: error.status, ...error.data };
  }

  if (isRouteErrorResponse(error)) {
    return {
      status: error.status,
      description: fallbackDescription(error.status),
      value: null,
    };
  }

  return {
    status: UNEXPECTED_STATUS,
    description: fallbackDescription(UNEXPECTED_STATUS),
    value: null,
  };
};
