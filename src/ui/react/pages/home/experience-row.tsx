import { joinClassNames } from "~/shared/lib/join-class-names";
import { SectionLabel } from "~/shared/components/section-label";
import { formatNumeral } from "~/shared/presentation/format-numeral";

type ExperienceRowProps = {
  readonly number: number;
  readonly isCurrent: boolean;
  readonly company: string;
  readonly period: string;
  readonly role: string;
  readonly text: string;
};

export function ExperienceRow({
  number,
  isCurrent,
  company,
  period,
  role,
  text,
}: ExperienceRowProps) {
  return (
    <li
      className="group relative grid grid-cols-[28px_minmax(0,1fr)] items-start
        gap-x-column gap-y-4 pb-18 last:pb-0
        md:grid-cols-[minmax(0,3fr)_28px_minmax(0,4fr)_minmax(0,4fr)]"
    >
      <span
        aria-hidden="true"
        className="col-span-full row-start-1 -ml-[0.06em] font-semibold
          text-timeline text-ghost select-none md:col-span-1 md:col-start-1"
      >
        {formatNumeral(number)}
      </span>
      <span
        aria-hidden="true"
        className="relative col-start-1 row-span-2 row-start-2 flex
          justify-center self-stretch md:col-start-2 md:row-span-1
          md:row-start-1"
      >
        <span
          className={joinClassNames(
            "relative z-1 mt-2 size-3.5 flex-none rounded-full border-2",
            "border-ink",
            isCurrent ? "bg-ink" : "bg-paper",
          )}
        />
        <span
          className="absolute top-[22px] -bottom-18 left-1/2 w-px
            -translate-x-1/2 bg-rule group-last:hidden"
        />
      </span>
      <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
        <SectionLabel>{`${period} · ${role}`}</SectionLabel>
        <h3 className="mt-4 text-company">{company}</h3>
      </div>
      <p
        className="col-start-2 row-start-3 max-w-[56ch] text-ink-2
          md:col-start-4 md:row-start-1 md:pt-8"
      >
        {text}
      </p>
    </li>
  );
}
