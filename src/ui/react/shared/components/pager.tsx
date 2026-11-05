import { ButtonLink } from "~/shared/components/button-link";

type PagerProps = {
  readonly previousHref: string | null;
  readonly nextHref: string | null;
  readonly previousLabel: string;
  readonly nextLabel: string;
};

export function Pager({
  previousHref,
  nextHref,
  previousLabel,
  nextLabel,
}: PagerProps) {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      <span>
        {previousHref !== null && (
          <ButtonLink tone="ghost" to={previousHref}>
            ← {previousLabel}
          </ButtonLink>
        )}
      </span>
      <span>
        {nextHref !== null && (
          <ButtonLink tone="ghost" to={nextHref}>
            {nextLabel} →
          </ButtonLink>
        )}
      </span>
    </div>
  );
}
