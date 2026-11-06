import type { ReactNode } from "react";

export type TagTone = "neutral" | "accent-2";

type TagProps = {
  readonly tone: TagTone;
  readonly children: ReactNode;
};

const TONE_CLASS_NAMES: Readonly<Record<TagTone, string>> = {
  neutral: "bg-tag-ground text-ink-2",
  "accent-2": "bg-accent-2-ground text-accent-2-ink",
};

export function Tag({ tone, children }: TagProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap
        rounded-xs px-2 py-1 text-tag ${TONE_CLASS_NAMES[tone]}`}
    >
      {children}
    </span>
  );
}
