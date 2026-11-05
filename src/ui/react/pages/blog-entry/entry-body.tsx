import type { EntryBlock } from "@domain/model/blog/blog-entry";
import { EntryBlockView } from "~/pages/blog-entry/entry-block-view";

type EntryBodyProps = {
  readonly blocks: readonly EntryBlock[];
};

export function EntryBody({ blocks }: EntryBodyProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <EntryBlockView key={index} block={block} />
      ))}
    </>
  );
}
