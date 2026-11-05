export type Page<T> = {
  readonly items: readonly T[];
  readonly number: number;
  readonly count: number;
  readonly total: number;
};

export const paginate = <T>(
  items: readonly T[],
  number: number,
  size: number,
): Page<T> | null => {
  const count = Math.max(1, Math.ceil(items.length / size));

  if (!Number.isInteger(number) || number < 1 || number > count) {
    return null;
  }

  return {
    items: items.slice((number - 1) * size, number * size),
    number,
    count,
    total: items.length,
  };
};
