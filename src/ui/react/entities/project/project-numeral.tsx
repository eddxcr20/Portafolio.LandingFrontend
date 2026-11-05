import { formatNumeral } from "~/shared/presentation/format-numeral";

type ProjectNumeralProps = {
  readonly order: number;
};

export function ProjectNumeral({ order }: ProjectNumeralProps) {
  return (
    <span
      aria-hidden="true"
      className="-ml-[0.06em] block font-semibold text-numeral text-ghost
        select-none md:col-span-5 md:col-start-1 md:row-start-1"
    >
      {formatNumeral(order)}
    </span>
  );
}
