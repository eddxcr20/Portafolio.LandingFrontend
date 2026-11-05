import type { ReactNode } from "react";
import { Link } from "react-router";
import { joinClassNames } from "~/shared/lib/join-class-names";

type ButtonTone = "secondary" | "ghost";

type ButtonLinkProps = {
  readonly tone: ButtonTone;
  readonly to: string;
  readonly children: ReactNode;
};

const TONE_CLASS_NAMES: Readonly<Record<ButtonTone, string>> = {
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

export function ButtonLink({ tone, to, children }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={joinClassNames(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xs",
        "border text-nav font-semibold no-underline",
        TONE_CLASS_NAMES[tone],
      )}
    >
      {children}
    </Link>
  );
}
