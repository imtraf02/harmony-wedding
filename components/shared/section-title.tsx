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
    <div className={`mb-16 md:mb-20 ${centered ? 'text-center' : ''}`}>

      {eyebrow && (
        <div className={`flex items-center gap-2.5 mb-[1.1rem] ${centered ? 'justify-center' : ''}`}>
          <span className="inline-block w-6 h-px bg-[#C9A96E] opacity-60 shrink-0" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#C9A96E] font-jost">
            {eyebrow}
          </p>
          {centered && (
            <span className="inline-block w-6 h-px bg-[#C9A96E] opacity-60 shrink-0" aria-hidden="true" />
          )}
        </div>
      )}

      <h2 className="font-cormorant font-light text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.15] tracking-[-0.01em] text-foreground mb-5">
        {title}
      </h2>

      {subtitle && (
        <p className={`text-[15px] font-light leading-[1.8] tracking-[0.01em] text-muted-foreground font-jost ${centered ? 'mx-auto' : ''} max-w-[36rem]`}>
          {subtitle}
        </p>
      )}

    </div>
  );
}