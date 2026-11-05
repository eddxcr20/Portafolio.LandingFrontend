import { useTranslation } from "react-i18next";
import type { ProjectPiece } from "@domain/model/projects/project-dossier";
import { SectionLabel } from "~/shared/components/section-label";

type DossierPiecesProps = {
  readonly pieces: readonly ProjectPiece[];
};

export function DossierPieces({ pieces }: DossierPiecesProps) {
  const { t } = useTranslation("dossier");

  return (
    <section className="px-gutter pb-24">
      <SectionLabel>{t("pieces")}</SectionLabel>
      <ol
        className="mt-8 grid gap-x-block gap-y-8 text-secondary
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      >
        {pieces.map((piece, index) => (
          <li
            key={piece.title}
            className="grid grid-cols-[2.5ch_minmax(0,1fr)] gap-3"
          >
            <span className="text-body font-semibold">{index + 1}</span>
            <span>
              <strong className="font-semibold">{piece.title}</strong>{" "}
              {piece.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
