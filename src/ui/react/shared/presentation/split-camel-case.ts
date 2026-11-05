const WORD_BOUNDARY = /(?<=\p{Ll})(?=\p{Lu})/u;

export const splitCamelCase = (text: string): readonly string[] =>
  text.split(WORD_BOUNDARY);
