import {
  type MouseEvent,
  type SyntheticEvent,
  type TransitionEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const STILL_QUERY = "(prefers-reduced-motion: reduce)";
const INLINE_NAV_QUERY = "(min-width: 1280px)";

export const useNavSheet = () => {
  const sheetRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const closeNow = (): void => {
    sheetRef.current?.close();
  };

  useEffect(() => {
    const inlineNav = matchMedia(INLINE_NAV_QUERY);
    const handleChange = (): void => {
      if (inlineNav.matches) {
        closeNow();
      }
    };

    inlineNav.addEventListener("change", handleChange);

    return () => inlineNav.removeEventListener("change", handleChange);
  }, []);

  const open = (): void => {
    sheetRef.current?.showModal();
  };

  const close = (): void => {
    if (matchMedia(STILL_QUERY).matches) {
      closeNow();
      return;
    }

    setIsClosing(true);
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>): void => {
    if (!event.cancelable) {
      return;
    }

    event.preventDefault();
    close();
  };

  const handleClosed = (): void => {
    setIsClosing(false);
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>): void => {
    const target = event.target;
    const isBackdrop = target === event.currentTarget;
    const isLink = target instanceof Element && target.closest("a") !== null;

    if (isBackdrop || isLink) {
      close();
    }
  };

  const handleTransitionEnd = (
    event: TransitionEvent<HTMLDialogElement>,
  ): void => {
    const isSheetSlide = event.target === event.currentTarget &&
      event.propertyName === "translate";

    if (isClosing && isSheetSlide) {
      closeNow();
    }
  };

  return {
    sheetRef,
    isClosing,
    open,
    close,
    handleCancel,
    handleClosed,
    handleClick,
    handleTransitionEnd,
  };
};
