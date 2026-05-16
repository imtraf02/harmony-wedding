"use client";

import {
  Maximize2Icon,
  Minimize2Icon,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface VideoEmbedProps {
  url: string;
  thumbnail?: string;
  title: string;
}

export function VideoEmbed({ url, thumbnail, title }: VideoEmbedProps) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const isDirectVideo =
    url.startsWith("/uploads/") ||
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === frameRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isDirectVideo) return;

    video.muted = false;
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => {
          video.muted = true;
          setMuted(true);
          void video
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        });
    }
  }, [isDirectVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    if (!frameRef.current) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void frameRef.current.requestFullscreen();
  };

  const seekTo = (value: number) => {
    const video = videoRef.current;
    if (!video?.duration) return;

    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  if (isDirectVideo) {
    return (
      <div
        ref={frameRef}
        className="group relative h-full w-full overflow-hidden bg-obsidian"
      >
        <video
          ref={videoRef}
          src={url}
          poster={thumbnail}
          autoPlay
          muted={muted}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            const value = video.duration
              ? (video.currentTime / video.duration) * 100
              : 0;
            setProgress(value);
          }}
          className="h-full w-full cursor-pointer object-contain"
        >
          Trình duyệt không hỗ trợ phát video.
        </video>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0_0_0/0.72)_100%)]" />

        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Phát video ${title}`}
          >
            <span className="flex size-20 items-center justify-center rounded-full border border-white/30 bg-white/12 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:size-24">
              <PlayIcon data-icon="inline-start" />
            </span>
          </button>
        )}

        <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3 text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 sm:right-6 sm:bottom-6 sm:left-6">
          <div className="group/seek relative flex h-5 items-center">
            <div
              className="pointer-events-none absolute top-1/2 left-0 h-px -translate-y-1/2 bg-white transition-[width] duration-150 group-hover/seek:h-1"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(event) => seekTo(Number(event.currentTarget.value))}
              className="h-5 w-full cursor-pointer appearance-none bg-white/20 accent-white [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              aria-label="Tua video"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium text-[11px] uppercase tracking-[0.24em]">
                Teaser Film
              </p>
              <p className="mt-1 text-[10px] text-white/60 uppercase tracking-[0.2em]">
                Couple Preview
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-black/35 p-1 backdrop-blur-md">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="rounded-full text-white hover:bg-white/15 hover:text-white"
                aria-label={playing ? "Tạm dừng video" : "Phát video"}
              >
                {playing ? (
                  <PauseIcon data-icon="inline-start" />
                ) : (
                  <PlayIcon data-icon="inline-start" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="rounded-full text-white hover:bg-white/15 hover:text-white"
                aria-label={muted ? "Bật âm thanh" : "Tắt tiếng"}
              >
                {muted ? (
                  <VolumeXIcon data-icon="inline-start" />
                ) : (
                  <Volume2Icon data-icon="inline-start" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="rounded-full text-white hover:bg-white/15 hover:text-white"
                aria-label={fullscreen ? "Thoát phóng to" : "Phóng to video"}
              >
                {fullscreen ? (
                  <Minimize2Icon data-icon="inline-start" />
                ) : (
                  <Maximize2Icon data-icon="inline-start" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className="absolute inset-0 bg-obsidian" aria-hidden="true" />
      )}
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
