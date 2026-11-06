import { formatNumeral } from "~/shared/presentation/format-numeral";

type MirroredProjectNumeralProps = {
  readonly order: number;
};

export function MirroredProjectNumeral({
  order,
}: MirroredProjectNumeralProps) {
  return (
    <span
      aria-hidden="true"
      className="-mr-[0.08em] block justify-self-end font-semibold
        text-numeral text-ghost select-none md:col-span-5 md:col-start-8
        md:row-start-1"
    >
      {formatNumeral(order)}
    </span>
  );
}
