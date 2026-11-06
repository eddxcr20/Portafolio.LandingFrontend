import { type PointerEvent, useEffect, useState } from "react";

const MOUSE = "mouse";
const PAGE_SELECTOR = "[data-notebook-page]";

type TappedPage = {
  readonly tappedPage: string | null;
  readonly tapPage: (event: PointerEvent, page: string) => void;
};

const isOnPage = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest(PAGE_SELECTOR) !== null;

export const useTappedPage = (): TappedPage => {
  const [tappedPage, setTappedPage] = useState<string | null>(null);

  useEffect(() => {
    if (tappedPage === null) {
      return;
    }

    const releaseOutside = (event: globalThis.PointerEvent): void => {
      if (!isOnPage(event.target)) {
        setTappedPage(null);
      }
    };

    document.addEventListener("pointerup", releaseOutside);

    return () => document.removeEventListener("pointerup", releaseOutside);
  }, [tappedPage]);

  const tapPage = (event: PointerEvent, page: string): void => {
    if (event.pointerType === MOUSE) {
      return;
    }

    setTappedPage((current) => (current === page ? null : page));
  };

  return { tappedPage, tapPage };
};
