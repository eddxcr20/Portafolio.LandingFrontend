import { formatProjectNumber } from
  "~/shared/presentation/format-project-number";

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
      {formatProjectNumber(order)}
    </span>
  );
}
