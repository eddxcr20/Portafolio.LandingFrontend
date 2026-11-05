import type { Tag } from "@domain/model/blog/tag";

export type TagLabelsDocument = Readonly<
  Record<string, { readonly es: string; readonly en: string }>
>;

export const toTag = (id: string, labels: TagLabelsDocument): Tag => {
  const label = labels[id];

  if (label === undefined) {
    throw new Error(`Unknown tag ${id}`);
  }

  return { id, label: { es: label.es, en: label.en } };
};
