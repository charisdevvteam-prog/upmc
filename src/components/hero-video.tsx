const VIDEO_ID = "CG_g0Mu7eHQ";

export function HeroVideo() {
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${VIDEO_ID}&disablekb=1&fs=0&iv_load_policy=3&start=0`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        title="UPMC conference gathering"
        src={src}
        allow="autoplay; encrypted-media; picture-in-picture"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-125 border-0"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/55 to-transparent" />
    </div>
  );
}
