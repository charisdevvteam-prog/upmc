"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setReady(true);
    const keepPlaying = () => {
      void video.play().catch(() => {
        setReady(false);
      });
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.addEventListener("playing", markReady);
    video.addEventListener("pause", keepPlaying);
    video.addEventListener("ended", keepPlaying);

    keepPlaying();

    return () => {
      video.removeEventListener("playing", markReady);
      video.removeEventListener("pause", keepPlaying);
      video.removeEventListener("ended", keepPlaying);
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
      <video
        ref={videoRef}
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        className="pointer-events-none absolute border-0"
        style={{
          top: "50%",
          left: "50%",
          width: "177.78vh",
          height: "56.25vw",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          WebkitTransform: "translate(-50%, -50%) scale(1.25)",
          transform: "translate(-50%, -50%) scale(1.25)",
        }}
      >
        <source src="/videos/hero-upmc.mp4" type="video/mp4" />
      </video>
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
