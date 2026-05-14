interface SectionTitleProps {
  eyebrow?  : string;
  title     : string;
  subtitle? : string;
  centered? : boolean;
}

export function SectionTitle({ eyebrow, title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-16 md:mb-20 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4 animate-fade-in">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-cormorant leading-tight animate-fade-in-up text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up [animation-delay:0.1s]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
