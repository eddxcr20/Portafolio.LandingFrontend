import type { ReactNode } from "react";

type TagProps = {
  readonly children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span
      className="inline-flex items-center rounded-xs bg-tag-ground px-2 py-1
        text-tag text-ink-2"
    >
      {children}
    </span>
  );
}
