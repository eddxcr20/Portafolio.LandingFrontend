export const joinClassNames = (
  ...classNames: readonly (string | false | null | undefined)[]
): string => classNames.filter(Boolean).join(" ");
