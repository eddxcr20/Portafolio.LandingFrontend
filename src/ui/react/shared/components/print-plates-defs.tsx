import { PrintPlateOffsetSheet } from
  "~/shared/components/print-plate-offset-sheet";
import {
  INK_MATRICES,
  OFFSET_PLATE_NAMES,
  PRINT_FILTER_ID,
} from "~/shared/lib/print-plates";

export function PrintPlatesDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id={PRINT_FILTER_ID} colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={INK_MATRICES.c.join(" ")}
            data-plate-matrix="c"
            result="c0"
          />
          <feComposite in="c0" in2="SourceAlpha" operator="in" result="c" />
          {OFFSET_PLATE_NAMES.map((plate) => (
            <PrintPlateOffsetSheet key={plate} plate={plate} />
          ))}
          <feBlend in="m" in2="c" mode="multiply" result="s1" />
          <feBlend in="y" in2="s1" mode="multiply" result="s2" />
          <feBlend in="k" in2="s2" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
}
