import type { ReactNode } from "react";

type FigureCaptionProps = {
  readonly children: ReactNode;
};

export function FigureCaption({ children }: FigureCaptionProps) {
  return (
    <figcaption className="mt-2 text-caption text-muted">
      {children}
    </figcaption>
  );
}
