import type { IconName } from "@/types/home";

interface IconProps {
  name: IconName | "heart" | "diamond" | "clock";
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const commonProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.4,
    viewBox: "0 0 48 48",
  };

  if (name === "camera") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M15 17h18a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6Z" />
        <path d="M17 17l3-5h8l3 5" />
        <circle cx="24" cy="28" r="7" />
      </svg>
    );
  }

  if (name === "film") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M11 15h26v22H11z" />
        <path d="M15 11l22 4M16 15l5-4M24 15l5-3M32 15l4-2" />
        <path d="M17 22h14M17 30h10" />
      </svg>
    );
  }

  if (name === "dress") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M20 9c1.8 3 6.2 3 8 0l2 9-4 5 7 16H15l7-16-4-5 2-9Z" />
        <path d="M19 18h10M22 23h4" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M13 14h22a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z" />
        <path d="M16 9v8M32 9v8M9 22h30M17 29h5M27 29h5" />
      </svg>
    );
  }

  if (name === "location") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M24 42s13-11 13-23a13 13 0 0 0-26 0c0 12 13 23 13 23Z" />
        <circle cx="24" cy="19" r="4" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M11 14h26v18H22l-8 6v-6h-3V14Z" />
        <path d="M18 22h12M18 27h7" />
      </svg>
    );
  }

  if (name === "moodboard") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M10 12h28v24H10z" />
        <path d="M15 17h9v7h-9zM28 17h5M28 23h5M15 29h18" />
      </svg>
    );
  }

  if (name === "aperture") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="24" cy="24" r="15" />
        <path d="M24 9l6 15M39 24l-15 6M30 39l-6-15M9 24l15-6M18 9l12 15M18 39l12-15" />
      </svg>
    );
  }

  if (name === "edit") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M14 34l2-8 15-15 6 6-15 15-8 2Z" />
        <path d="M28 14l6 6M12 39h24" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M24 38S10 30 10 18a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 12-12 20-12 20Z" />
      </svg>
    );
  }

  if (name === "diamond") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 18l6-7h12l6 7-12 19-12-19Z" />
        <path d="M12 18h24M18 11l6 26M30 11l-6 26" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="24" cy="24" r="15" />
        <path d="M24 15v10l7 4" />
      </svg>
    );
  }

  if (name === "dress-rental") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M24 8a4 4 0 0 1 4 4c0 1.5-1 3-3 3.7V18" />
        <path d="M13 22l11-4 11 4" />
        <path d="M15 22l4 18h10l4-18H15Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" {...commonProps}>
      <path d="M10 18l14-8 14 8-14 8-14-8Z" />
      <path d="M10 18v16l14 8 14-8V18M24 26v16" />
    </svg>
  );
}
