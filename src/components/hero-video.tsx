const VIDEO_ID = "CG_g0Mu7eHQ";

export function HeroVideo() {
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${VIDEO_ID}&disablekb=1&fs=0&iv_load_policy=3&start=0`;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#000", zIndex: 0 }}
    >
      <iframe
        title="UPMC conference gathering"
        src={src}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="pointer-events-none absolute border-0"
        style={{
          top: "50%",
          left: "50%",
          width: "177.78vh",
          height: "56.25vw",
          minWidth: "100%",
          minHeight: "100%",
          zIndex: 0,
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
