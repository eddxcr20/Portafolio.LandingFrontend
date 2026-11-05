import { useTranslation } from "react-i18next";
import { PrintFigure } from "~/shared/components/print-figure";
import { SectionLabel } from "~/shared/components/section-label";
import { CONTACT_LINKS } from "~/shared/lib/contact-links";

const PORTRAIT_IMAGE = "/images/portrait.webp";
const CONTACT_LINK_CLASS_NAME = "text-ink no-underline hover:text-accent";

export function About() {
  const { t } = useTranslation("home");

  return (
    <section
      id="about"
      className="grid grid-cols-1 items-start gap-x-column
        gap-y-10 px-gutter pb-28 md:grid-cols-12"
    >
      <div className="md:col-span-full">
        <SectionLabel>{t("about.label")}</SectionLabel>
        <h2 className="mt-8 text-about">{t("about.headline")}</h2>
      </div>
      <div
        className="max-w-[480px] md:col-span-5 md:col-start-1
          md:max-w-none"
      >
        <PrintFigure
          aspect="portrait"
          src={PORTRAIT_IMAGE}
          alt={t("about.portraitAlt")}
          caption={
            <figcaption className="mt-4 text-caption text-muted">
              {t("common:person.name")}
            </figcaption>
          }
        />
      </div>
      <div
        className="flex flex-col gap-4 self-stretch text-ink-2 md:col-span-6
          md:col-start-7"
      >
        <p>{t("about.beginnings")}</p>
        <p>{t("about.grapht")}</p>
        <p>{t("about.outside")}</p>
        <blockquote
          className="mt-4 ml-auto max-w-[34ch] text-right text-quote italic
            text-ink-2"
        >
          {t("about.quote")}
        </blockquote>
        <div
          id="contact"
          className="mt-auto flex flex-col items-end gap-4 pt-10
            text-right"
        >
          <SectionLabel>{t("about.contactLabel")}</SectionLabel>
          <div
            className="flex flex-col items-end gap-x-contact gap-y-4
              text-contact font-semibold md:flex-row md:flex-wrap
              md:justify-end"
          >
            <a href={CONTACT_LINKS.email} className={CONTACT_LINK_CLASS_NAME}>
              {t("about.email")}
            </a>
            <a href={CONTACT_LINKS.github} className={CONTACT_LINK_CLASS_NAME}>
              GitHub
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              className={CONTACT_LINK_CLASS_NAME}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
