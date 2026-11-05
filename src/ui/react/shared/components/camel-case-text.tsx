import { Fragment } from "react";
import { splitCamelCase } from "~/shared/presentation/split-camel-case";

type CamelCaseTextProps = {
  readonly text: string;
};

export function CamelCaseText({ text }: CamelCaseTextProps) {
  return (
    <>
      {splitCamelCase(text).map((word, index) => (
        <Fragment key={index}>
          {index > 0 && <wbr />}
          {word}
        </Fragment>
      ))}
    </>
  );
}
