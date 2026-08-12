import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <Reveal className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/90">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">{title}</h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-200/90 text-pretty">{description}</p>
      )}
    </Reveal>
  );
}
