"use client";

import { useEffect } from "react";

interface AutoScrollAnchorProps {
  targetId: string;
  behavior?: ScrollBehavior;
}

export function AutoScrollAnchor({
  targetId,
  behavior = "smooth",
}: AutoScrollAnchorProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior,
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [behavior, targetId]);

  return null;
}
