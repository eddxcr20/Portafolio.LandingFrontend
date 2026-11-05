import {
  INK_MATRICES,
  OFFSET_PLATE_NAMES,
  PLATE_NAMES,
  PLATE_OFFSETS,
  PURE_MATRICES,
} from "~/shared/lib/print-plates";

const LEAN_X = 2.5;
const LEAN_Y = 2;
const REGISTER_MS = 450;
const SMOOTHING = 0.22;
const SETTLED = 0.002;
const PRINT_SELECTOR = ".cmyk .print";
const MOUSE = "mouse";
const REGISTERED = 0;
const MISREGISTERED = 1;

type PressState = {
  pointerX: number;
  pointerY: number;
  targetX: number;
  targetY: number;
  register: number;
  registerFrom: number;
  registerTo: number;
  registerStart: number;
  frame: number;
  lastOffsets: string;
  lastRegister: number;
  pointerType: string;
};

const easeOut = (progress: number): number => 1 - Math.pow(1 - progress, 3);

const lerpMatrix = (
  ink: readonly number[],
  pure: readonly number[],
  register: number,
): string =>
  ink
    .map((value, index) =>
      (pure[index] + (value - pure[index]) * register).toFixed(3),
    )
    .join(" ");

const readNodes = (
  filter: Element,
  attribute: string,
): ReadonlyMap<string, Element> =>
  new Map(
    [...filter.querySelectorAll(`[${attribute}]`)].map((node) => [
      node.getAttribute(attribute) ?? "",
      node,
    ]),
  );

const findPrint = (target: EventTarget | null): Element | null =>
  target instanceof Element ? target.closest(PRINT_SELECTOR) : null;

const isInside = (print: Element, target: EventTarget | null): boolean =>
  target instanceof Node && print.contains(target);

export const startPrintPress = (filter: Element): (() => void) => {
  const offsets = readNodes(filter, "data-plate");
  const matrices = readNodes(filter, "data-plate-matrix");
  const state: PressState = {
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
    register: 1,
    registerFrom: 1,
    registerTo: 1,
    registerStart: 0,
    frame: 0,
    lastOffsets: "",
    lastRegister: -1,
    pointerType: MOUSE,
  };

  const writeOffsets = (): void => {
    const leanX = LEAN_X * state.pointerX;
    const leanY = LEAN_Y * state.pointerY;
    const values = OFFSET_PLATE_NAMES.map((plate) => [
      plate,
      ((PLATE_OFFSETS[plate][0] + leanX) * state.register).toFixed(2),
      ((PLATE_OFFSETS[plate][1] + leanY) * state.register).toFixed(2),
    ]);
    const key = values.map((value) => value.join(",")).join(";");

    if (key === state.lastOffsets) {
      return;
    }

    state.lastOffsets = key;
    values.forEach(([plate, dx, dy]) => {
      offsets.get(plate)?.setAttribute("dx", dx);
      offsets.get(plate)?.setAttribute("dy", dy);
    });
  };

  const writeMatrices = (): void => {
    if (state.register === state.lastRegister) {
      return;
    }

    state.lastRegister = state.register;
    PLATE_NAMES.forEach((plate) =>
      matrices.get(plate)?.setAttribute(
        "values",
        lerpMatrix(INK_MATRICES[plate], PURE_MATRICES[plate], state.register),
      ),
    );
  };

  const isMoving = (): boolean =>
    state.registerStart !== 0 ||
    Math.abs(state.targetX - state.pointerX) > SETTLED ||
    Math.abs(state.targetY - state.pointerY) > SETTLED;

  const tick = (now: number): void => {
    state.frame = 0;
    state.pointerX += (state.targetX - state.pointerX) * SMOOTHING;
    state.pointerY += (state.targetY - state.pointerY) * SMOOTHING;

    if (state.registerStart !== 0) {
      const progress = Math.min(1, (now - state.registerStart) / REGISTER_MS);
      const span = state.registerTo - state.registerFrom;

      state.register = state.registerFrom + span * easeOut(progress);
      state.registerStart = progress >= 1 ? 0 : state.registerStart;
    }

    writeOffsets();
    writeMatrices();

    if (isMoving()) {
      schedule();
    }
  };

  const schedule = (): void => {
    if (state.frame === 0) {
      state.frame = requestAnimationFrame(tick);
    }
  };

  const retarget = (register: number): void => {
    state.registerFrom = state.register;
    state.registerTo = register;
    state.registerStart = performance.now();
    schedule();
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== MOUSE) {
      return;
    }

    state.targetX = (2 * event.clientX) / innerWidth - 1;
    state.targetY = (2 * event.clientY) / innerHeight - 1;
    schedule();
  };

  const isPrintCrossing = (event: PointerEvent): boolean => {
    const print = findPrint(event.target);

    return event.pointerType === MOUSE &&
      print !== null &&
      !isInside(print, event.relatedTarget);
  };

  const onPointerOver = (event: PointerEvent): void => {
    if (isPrintCrossing(event)) {
      retarget(REGISTERED);
    }
  };

  const onPointerOut = (event: PointerEvent): void => {
    if (isPrintCrossing(event)) {
      retarget(MISREGISTERED);
    }
  };

  const onPointerDown = (event: PointerEvent): void => {
    state.pointerType = event.pointerType;
  };

  const onTap = (event: MouseEvent): void => {
    if (state.pointerType === MOUSE) {
      return;
    }

    const isPrintTap = findPrint(event.target) !== null;
    const isRegistered = state.registerTo === REGISTERED;

    retarget(isPrintTap && !isRegistered ? REGISTERED : MISREGISTERED);
  };

  addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);
  document.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("click", onTap);

  return () => {
    cancelAnimationFrame(state.frame);
    removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerover", onPointerOver);
    document.removeEventListener("pointerout", onPointerOut);
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("click", onTap);
  };
};
