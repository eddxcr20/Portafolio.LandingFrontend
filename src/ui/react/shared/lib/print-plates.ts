export const PRINT_FILTER_ID = "sep-all";

export type PlateName = "c" | "m" | "y" | "k";

export type OffsetPlateName = Exclude<PlateName, "c">;

export const PLATE_NAMES: readonly PlateName[] = ["c", "m", "y", "k"];

export const OFFSET_PLATE_NAMES: readonly OffsetPlateName[] = ["m", "y", "k"];

export const PLATE_OFFSETS: Readonly<
  Record<OffsetPlateName, readonly [number, number]>
> = {
  m: [5, 3],
  y: [-5, -3],
  k: [3, 6],
};

export const INK_MATRICES: Readonly<Record<PlateName, readonly number[]>> = {
  c: [1, 0, 0, 0, 0, 0.467, 0, 0, 0, 0.533, 0.31, 0, 0, 0, 0.69,
    0, 0, 0, 0, 1],
  m: [0, 0.161, 0, 0, 0.839, 0, 1, 0, 0, 0, 0, 0.576, 0, 0, 0.424,
    0, 0, 0, 0, 1],
  y: [0, 0, 0.071, 0, 0.929, 0, 0, 0.267, 0, 0.733, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 1],
  k: [0.112, 0.375, 0.038, 0, 0.475, 0.113, 0.379, 0.038, 0, 0.471,
    0.113, 0.38, 0.038, 0, 0.468, 0, 0, 0, 0, 1],
};

export const PURE_MATRICES: Readonly<Record<PlateName, readonly number[]>> = {
  c: [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  m: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  y: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  k: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
};
