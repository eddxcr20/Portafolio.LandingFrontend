import { XIcon } from "@phosphor-icons/react";
import type {
  MouseEvent,
  RefObject,
  SyntheticEvent,
  TransitionEvent,
} from "react";
import { useTranslation } from "react-i18next";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { LanguageSwitch } from "~/shared/components/language-switch";
import { MenuButton } from "~/shared/components/menu-button";
import { joinClassNames } from "~/shared/lib/join-class-names";
import type { NavLink } from "~/widgets/site-nav/model/nav-link";
import { NavBrand } from "~/widgets/site-nav/nav-brand";

type NavSheetProps = {
  readonly sheetRef: RefObject<HTMLDialogElement | null>;
  readonly isClosing: boolean;
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly subtitle: string;
  readonly brandHref: string;
  readonly brandLabel: string;
  readonly links: readonly NavLink[];
  readonly onCloseClick: () => void;
  readonly onClosed: () => void;
  readonly onCancel: (event: SyntheticEvent<HTMLDialogElement>) => void;
  readonly onClick: (event: MouseEvent<HTMLDialogElement>) => void;
  readonly onTransitionEnd: (
    event: TransitionEvent<HTMLDialogElement>,
  ) => void;
};

const SHEET_CLASS_NAME = joinClassNames(
  "fixed inset-x-0 top-0 bottom-auto m-0 max-h-dvh w-full max-w-none",
  "overflow-y-auto border-0 bg-paper p-0 text-body text-ink lg:hidden",
  "md:left-auto md:bottom-0 md:h-dvh md:w-side-sheet",
  "transition-[translate] duration-200 ease-out",
  "open:data-closing:ease-in motion-reduce:transition-none",
  "starting:open:-translate-y-full open:data-closing:-translate-y-full",
  "md:starting:open:translate-x-full md:starting:open:translate-y-0",
  "md:open:data-closing:translate-x-full",
  "md:open:data-closing:translate-y-0",
  "backdrop:bg-scrim backdrop:transition-opacity backdrop:duration-200",
  "starting:open:backdrop:opacity-0 open:data-closing:backdrop:opacity-0",
  "motion-reduce:backdrop:transition-none",
);

export function NavSheet({
  sheetRef,
  isClosing,
  language,
  alternates,
  subtitle,
  brandHref,
  brandLabel,
  links,
  onCloseClick,
  onClosed,
  onCancel,
  onClick,
  onTransitionEnd,
}: NavSheetProps) {
  const { t } = useTranslation("common");

  return (
    <dialog
      ref={sheetRef}
      data-closing={isClosing ? "" : undefined}
      onCancel={onCancel}
      onClose={onClosed}
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
      aria-label={t("nav.menu")}
      className={SHEET_CLASS_NAME}
    >
      <div
        className="flex items-center justify-between gap-x-2 px-gutter py-4
          md:absolute md:top-0 md:right-0"
      >
        <div className="md:hidden">
          <NavBrand
            subtitle={subtitle}
            brandHref={brandHref}
            brandLabel={brandLabel}
          />
        </div>
        <MenuButton label={t("nav.closeMenu")} onClick={onCloseClick}>
          <XIcon size={24} weight="duotone" aria-hidden="true" />
        </MenuButton>
      </div>
      <div className="flex flex-col items-start px-gutter pb-8 md:pt-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="py-2 text-lead text-ink no-underline hover:text-accent"
          >
            {link.label}
          </a>
        ))}
        <div className="mt-4">
          <LanguageSwitch language={language} alternates={alternates} />
        </div>
      </div>
    </dialog>
  );
}
