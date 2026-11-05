import { useTranslation } from "react-i18next";
import type { Language } from "@domain/model/common/language";
import { ButtonDownload } from "~/shared/components/button-download";
import { ButtonLink } from "~/shared/components/button-link";
import { SectionLabel } from "~/shared/components/section-label";
import { CONTACT_LINKS } from "~/shared/lib/contact-links";
import { cvPath } from "~/shared/lib/site-paths";

type DoorsProps = {
  readonly language: Language;
};

const DOOR_CLASS_NAME = "grid content-start gap-8";
const QUESTION_CLASS_NAME = "text-door font-normal italic";
const TEXT_CLASS_NAME = "max-w-[48ch] text-ink-2";
const ACTIONS_CLASS_NAME = "flex flex-wrap gap-4";

export function Doors({ language }: DoorsProps) {
  const { t } = useTranslation("home");

  return (
    <section
      className="grid grid-cols-1 items-start gap-x-hero-gap gap-y-18 px-gutter
        pb-24 md:grid-cols-2"
    >
      <div className={DOOR_CLASS_NAME}>
        <SectionLabel>{t("doors.employers.label")}</SectionLabel>
        <h2 className={QUESTION_CLASS_NAME}>
          {t("doors.employers.question")}
        </h2>
        <p className={TEXT_CLASS_NAME}>{t("doors.employers.text")}</p>
        <div className={ACTIONS_CLASS_NAME}>
          <ButtonLink tone="primary" to={CONTACT_LINKS.linkedin}>
            {t("doors.employers.linkedin")}
          </ButtonLink>
          <ButtonDownload tone="secondary" href={cvPath(language)}>
            {t("cv")}
          </ButtonDownload>
        </div>
      </div>
      <div className={DOOR_CLASS_NAME}>
        <SectionLabel>{t("doors.businesses.label")}</SectionLabel>
        <h2 className={QUESTION_CLASS_NAME}>
          {t("doors.businesses.question")}
        </h2>
        <p className={TEXT_CLASS_NAME}>{t("doors.businesses.text")}</p>
        <div className={ACTIONS_CLASS_NAME}>
          <ButtonLink tone="primary" to={CONTACT_LINKS.email}>
            {t("doors.businesses.contact")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
