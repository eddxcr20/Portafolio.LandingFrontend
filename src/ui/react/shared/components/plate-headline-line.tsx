type PlateHeadlineLineProps = {
  readonly text: string;
};

export function PlateHeadlineLine({ text }: PlateHeadlineLineProps) {
  return (
    <span className="cmyk-head block">
      <span className="paper">{text}</span>
      <span className="plate plate-c" aria-hidden="true">{text}</span>
      <span className="plate plate-m" aria-hidden="true">{text}</span>
      <span className="plate plate-y" aria-hidden="true">{text}</span>
    </span>
  );
}
