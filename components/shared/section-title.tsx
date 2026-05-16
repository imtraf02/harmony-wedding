// components/shared/SectionTitle.tsx
interface SectionTitleProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`mb-16 md:mb-20 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <div
          className={`mb-[1.1rem] flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}
        >
          <span
            className="inline-block h-px w-6 shrink-0 bg-obsidian opacity-60"
            aria-hidden="true"
          />
          <p className="font-medium font-sans text-[10px] text-obsidian uppercase tracking-[0.22em]">
            {eyebrow}
          </p>
          {centered && (
            <span
              className="inline-block h-px w-6 shrink-0 bg-obsidian opacity-60"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      <h2 className="mb-5 font-light font-sans text-[clamp(2.4rem,5vw,3.5rem)] text-foreground leading-[1.15] tracking-[-0.01em]">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`font-light font-sans text-[15px] text-muted-foreground leading-[1.8] tracking-[0.01em] ${centered ? "mx-auto" : ""} max-w-[36rem]`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
