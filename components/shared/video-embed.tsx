"use client";

import Image from "next/image";
import { useState } from "react";

interface VideoEmbedProps {
  url: string;
  thumbnail: string;
  title: string;
}

export function VideoEmbed({ url, thumbnail, title }: VideoEmbedProps) {
  const [active, setActive] = useState(false);

  if (active) {
    // Append autoplay on user-initiated load
    const embedUrl = url.includes("?")
      ? `${url}&autoplay=1`
      : `${url}?autoplay=1`;
    return (
      <div className="video-embed video-embed--active">
        <iframe
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="autoplay; encrypted-media"
          loading="lazy"
          className="video-iframe"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="video-embed video-embed--thumbnail"
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ objectFit: "cover" }}
      />
      <span className="video-play-btn" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.15)" />
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
          <polygon points="26,20 50,32 26,44" fill="white" />
        </svg>
      </span>
    </button>
  );
}
