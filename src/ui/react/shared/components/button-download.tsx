import type { ReactNode } from "react";
import {
  type ButtonTone,
  buttonClassName,
} from "~/shared/components/button-class-name";

type ButtonDownloadProps = {
  readonly tone: ButtonTone;
  readonly href: string;
  readonly children: ReactNode;
};

export function ButtonDownload({ tone, href, children }: ButtonDownloadProps) {
  return (
    <a href={href} download className={buttonClassName(tone)}>
      {children}
    </a>
  );
}
