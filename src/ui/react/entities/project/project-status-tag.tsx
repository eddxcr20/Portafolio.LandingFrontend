import type { ProjectStatus } from "@domain/model/projects/project-dossier";
import { Tag, type TagTone } from "~/shared/components/tag";

type ProjectStatusTagProps = {
  readonly status: ProjectStatus;
  readonly label: string;
};

const STATUS_TONES: Readonly<Record<ProjectStatus, TagTone>> = {
  working: "neutral",
  "in-progress": "accent-2",
};

export function ProjectStatusTag({ status, label }: ProjectStatusTagProps) {
  return <Tag tone={STATUS_TONES[status]}>{label}</Tag>;
}
