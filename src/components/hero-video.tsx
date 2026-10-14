"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "CG_g0Mu7eHQ";
const TITLE_FADE_MS = 3000;

type YTPlayer = {
  mute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | undefined;

function loadYouTubeApi() {
  apiPromise ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function HeroVideo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let player: YTPlayer | undefined;
    let revealTimer: number | undefined;
    let cancelled = false;
    let hasPlayed = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      const target = document.createElement("div");
      mountRef.current.appendChild(target);
      player = new YT.Player(target, {
        videoId: VIDEO_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
        },
        events: {
          onReady: ({ target }) => {
            target.mute();
            target.playVideo();
          },
          onStateChange: ({ data, target }) => {
            window.clearTimeout(revealTimer);
            if (data === 1) {
              revealTimer = window.setTimeout(
                () => setVisible(true),
                hasPlayed ? 0 : TITLE_FADE_MS,
              );
              hasPlayed = true;
            } else if (data === 0) {
              setVisible(false);
              target.seekTo(0, true);
              target.playVideo();
            } else if (data === 2) {
              setVisible(false);
              target.playVideo();
            } else {
              setVisible(false);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      player?.destroy();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#000", zIndex: 0 }}
    >
      <Image
        src="/images/photo-1.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div
        ref={mountRef}
        aria-hidden
        className="pointer-events-none absolute [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
        style={{
          top: "50%",
          left: "50%",
          width: "177.78vh",
          height: "56.25vw",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          WebkitTransform: "translate(-50%, -50%) scale(1.25)",
          transform: "translate(-50%, -50%) scale(1.25)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          zIndex: 2,
          height: "66.666%",
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0) 100%)",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
