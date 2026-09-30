// Shared "eyebrow + big bold heading" pattern used to open a major page
// section — one definition so this look stays consistent everywhere it's
// used, instead of every section picking its own heading size.
export function SectionHeading({
  eyebrow,
  title,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  /** White/gold variant for use over a photo or dark background. */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-secondary" aria-hidden />
        <p className={`text-xs font-bold uppercase tracking-widest ${light ? "text-secondary" : "text-secondary-dark"}`}>
          {eyebrow}
        </p>
      </div>
      <h2
        className={`mt-3 text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-[2.75rem] ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
