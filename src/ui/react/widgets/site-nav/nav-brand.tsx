import { Link } from "react-router";
import { BrandLogo } from "~/shared/components/brand-logo";

type NavBrandProps = {
  readonly subtitle: string;
  readonly brandHref: string;
  readonly brandLabel: string;
};

export function NavBrand({ subtitle, brandHref, brandLabel }: NavBrandProps) {
  return (
    <span className="mr-auto flex flex-col gap-1">
      <Link to={brandHref} aria-label={brandLabel} className="block w-fit">
        <BrandLogo />
      </Link>
      <span
        className="text-label tracking-[0.06em] text-muted uppercase"
      >
        {subtitle}
      </span>
    </span>
  );
}
