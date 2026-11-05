import type { ReactNode } from "react";
import { Link } from "react-router";
import {
  type ButtonTone,
  buttonClassName,
} from "~/shared/components/button-class-name";

type ButtonLinkProps = {
  readonly tone: ButtonTone;
  readonly to: string;
  readonly children: ReactNode;
};

export function ButtonLink({ tone, to, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClassName(tone)}>
      {children}
    </Link>
  );
}
