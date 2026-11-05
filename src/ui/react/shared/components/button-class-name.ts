import { joinClassNames } from "~/shared/lib/join-class-names";

export type ButtonTone = "primary" | "secondary" | "ghost";

const TONE_CLASS_NAMES: Readonly<Record<ButtonTone, string>> = {
  primary: joinClassNames(
    "border-transparent bg-accent px-4 text-paper hover:bg-accent-hover",
    "hover:text-paper active:bg-link",
  ),
  secondary: joinClassNames(
    "border-divider px-4 text-ink hover:bg-hover-ink hover:text-ink",
    "active:bg-press-ink",
  ),
  ghost: joinClassNames(
    "border-transparent px-2 text-accent hover:bg-hover-accent",
    "hover:text-accent",
    "active:bg-press-accent",
  ),
};

export const buttonClassName = (tone: ButtonTone): string =>
  joinClassNames(
    "inline-flex h-10 items-center justify-center gap-2 rounded-xs",
    "border text-nav font-semibold no-underline",
    TONE_CLASS_NAMES[tone],
  );
