import type { ReactNode } from "react";

type SectionLabelProps = {
  readonly children: ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return <p className="text-label text-muted uppercase">{children}</p>;
}
