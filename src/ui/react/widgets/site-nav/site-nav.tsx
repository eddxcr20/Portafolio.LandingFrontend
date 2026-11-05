import { ListIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { LanguageSwitch } from "~/shared/components/language-switch";
import { MenuButton } from "~/shared/components/menu-button";
import type { NavLink } from "~/widgets/site-nav/model/nav-link";
import { NavBrand } from "~/widgets/site-nav/nav-brand";
import { NavSheet } from "~/widgets/site-nav/nav-sheet";
import { useNavSheet } from "~/widgets/site-nav/use-nav-sheet";

type SiteNavProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly subtitle: string;
  readonly brandHref: string;
  readonly brandLabel: string;
  readonly links: readonly NavLink[];
};

export function SiteNav({
  language,
  alternates,
  subtitle,
  brandHref,
  brandLabel,
  links,
}: SiteNavProps) {
  const { t } = useTranslation("common");
  const {
    sheetRef,
    isClosing,
    open,
    close,
    handleCancel,
    handleClosed,
    handleClick,
    handleTransitionEnd,
  } = useNavSheet();

  return (
    <nav
      className="sticky top-0 z-30 flex items-center gap-x-2 bg-paper
        px-gutter py-4 lg:gap-x-6"
    >
      <NavBrand
        subtitle={subtitle}
        brandHref={brandHref}
        brandLabel={brandLabel}
      />
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hidden text-nav text-ink no-underline hover:text-accent
            lg:inline"
        >
          {link.label}
        </a>
      ))}
      <div className="hidden lg:block">
        <LanguageSwitch language={language} alternates={alternates} />
      </div>
      <div className="lg:hidden">
        <MenuButton label={t("nav.openMenu")} onClick={open}>
          <ListIcon size={24} weight="duotone" aria-hidden="true" />
        </MenuButton>
      </div>
      <NavSheet
        sheetRef={sheetRef}
        isClosing={isClosing}
        language={language}
        alternates={alternates}
        subtitle={subtitle}
        brandHref={brandHref}
        brandLabel={brandLabel}
        links={links}
        onCloseClick={close}
        onClosed={handleClosed}
        onCancel={handleCancel}
        onClick={handleClick}
        onTransitionEnd={handleTransitionEnd}
      />
    </nav>
  );
}
