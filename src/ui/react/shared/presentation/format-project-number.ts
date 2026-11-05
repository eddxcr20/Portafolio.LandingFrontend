export const formatProjectNumber = (order: number): string =>
  String(order).padStart(2, "0");
