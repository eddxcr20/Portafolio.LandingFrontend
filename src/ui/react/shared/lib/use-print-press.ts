import { useEffect } from "react";
import { PRINT_FILTER_ID } from "~/shared/lib/print-plates";
import { startPrintPress } from "~/shared/lib/print-press";

const STILL_QUERY = "(prefers-reduced-motion: reduce)";

export const usePrintPress = (): void => {
  useEffect(() => {
    const filter = document.getElementById(PRINT_FILTER_ID);

    if (filter === null || matchMedia(STILL_QUERY).matches) {
      return;
    }

    return startPrintPress(filter);
  }, []);
};
