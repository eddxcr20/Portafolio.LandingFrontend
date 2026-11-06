import type { ReactNode } from "react";

type MirroredProjectTitleBlockProps = {
  readonly children: ReactNode;
};

export function MirroredProjectTitleBlock({
  children,
}: MirroredProjectTitleBlockProps) {
  return (
    <div
      className="relative pt-4 md:col-span-10 md:col-start-3 md:row-start-1
        md:self-end md:pt-title-rise md:text-right"
    >
      {children}
    </div>
  );
}
