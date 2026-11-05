import type { EntryBlock } from "@domain/model/blog/blog-entry";

type EntryBlockViewProps = {
  readonly block: EntryBlock;
};

export function EntryBlockView({ block }: EntryBlockViewProps) {
  switch (block.kind) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="grid list-disc gap-2 pl-6 marker:text-muted">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
  }
}
