import type { ReactNode } from "react";

type PrintAspect = "landscape" | "portrait";

type PrintFigureProps = {
  readonly aspect: PrintAspect;
  readonly src: string;
  readonly alt: string;
  readonly caption: ReactNode;
};

const ASPECT_CLASS_NAMES: Readonly<Record<PrintAspect, string>> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
};

export function PrintFigure({ aspect, src, alt, caption }: PrintFigureProps) {
  return (
    <figure>
      <div className="cmyk">
        <div className={`print ${ASPECT_CLASS_NAMES[aspect]}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block size-full object-cover"
          />
        </div>
      </div>
      {caption}
    </figure>
  );
}
