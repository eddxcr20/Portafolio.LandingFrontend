import { useTranslation } from "react-i18next";
import type { Language } from "@domain/model/common/language";
import type { Localized } from "@domain/model/common/localized";
import { About } from "~/pages/home/about";
import { Doors } from "~/pages/home/doors";
import { Experience } from "~/pages/home/experience";
import { GraphtShowcase } from "~/pages/home/grapht-showcase";
import { HomeHero } from "~/pages/home/home-hero";
import { HowIWork } from "~/pages/home/how-i-work";
import { Notebook } from "~/pages/home/notebook";
import { homePath } from "~/shared/lib/site-paths";
import { SiteNav } from "~/widgets/site-nav/site-nav";

type HomePageProps = {
  readonly language: Language;
  readonly alternates: Localized<string>;
  readonly blogUrl: string;
};

export function HomePage({ language, alternates, blogUrl }: HomePageProps) {
  const { t } = useTranslation("home");

  return (
    <div className="@container mx-auto max-w-page text-body">
      <SiteNav
        language={language}
        alternates={alternates}
        subtitle={t("tagline")}
        brandHref={homePath(language)}
        brandLabel={t("common:brand.home")}
        links={[
          { href: "#projects", label: t("common:nav.projects") },
          { href: "#experience", label: t("common:nav.experience") },
          { href: "#how-i-work", label: t("common:nav.method") },
          { href: "#about", label: t("common:nav.about") },
          { href: "#contact", label: t("common:nav.contact") },
          { href: blogUrl, label: t("common:nav.blog") },
        ]}
      />
      <main>
        <HomeHero />
        <Notebook />
        <GraphtShowcase language={language} />
        <Experience />
        <HowIWork />
        <Doors language={language} />
        <About language={language} />
      </main>
    </div>
  );
}
