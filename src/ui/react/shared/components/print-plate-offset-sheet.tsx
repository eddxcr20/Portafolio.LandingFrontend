import {
  INK_MATRICES,
  type OffsetPlateName,
  PLATE_OFFSETS,
} from "~/shared/lib/print-plates";

type PrintPlateOffsetSheetProps = {
  readonly plate: OffsetPlateName;
};

export function PrintPlateOffsetSheet({ plate }: PrintPlateOffsetSheetProps) {
  return (
    <>
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values={INK_MATRICES[plate].join(" ")}
        data-plate-matrix={plate}
        result={`${plate}0`}
      />
      <feComposite
        in={`${plate}0`}
        in2="SourceAlpha"
        operator="in"
        result={`${plate}1`}
      />
      <feOffset
        in={`${plate}1`}
        dx={PLATE_OFFSETS[plate][0]}
        dy={PLATE_OFFSETS[plate][1]}
        data-plate={plate}
        result={plate}
      />
    </>
  );
}
