import type { ReactNode } from "react";

type ProjectTitleBlockProps = {
  readonly children: ReactNode;
};

export function ProjectTitleBlock({ children }: ProjectTitleBlockProps) {
  return (
    <div
      className="relative pt-4 md:col-span-10 md:col-start-3 md:row-start-1
        md:self-end md:pt-title-rise"
    >
      {children}
    </div>
  );
}
