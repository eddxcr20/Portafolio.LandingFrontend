import { Link } from "react-router";
import type { TagView } from "@domain/model/blog/tag";
import type { Language } from "@domain/model/common/language";
import { blogTagPath } from "~/shared/lib/site-paths";

type EntryTagLinksProps = {
  readonly language: Language;
  readonly tags: readonly TagView[];
};

export function EntryTagLinks({ language, tags }: EntryTagLinksProps) {
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          to={blogTagPath(language, tag.slug)}
          className="text-inherit hover:text-accent"
        >
          #{tag.label}
        </Link>
      ))}
    </>
  );
}
