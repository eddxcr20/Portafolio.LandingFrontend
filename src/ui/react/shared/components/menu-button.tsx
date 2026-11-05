import type { ReactNode } from "react";

type MenuButtonProps = {
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
};

export function MenuButton({ label, onClick, children }: MenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 flex-none items-center justify-center
        rounded-xs text-ink hover:bg-hover-ink active:bg-press-ink"
    >
      {children}
    </button>
  );
}
