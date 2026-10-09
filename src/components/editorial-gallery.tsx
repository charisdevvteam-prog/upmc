"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";

const images = [
  {
    src: "/images/photo-7.jpg",
    alt: "The congregation gathered for teaching at UPMC",
    size: "wide",
  },
  {
    src: "/images/photo-1.jpg",
    alt: "Pastor Roy King Grace teaching during the conference",
    size: "tall",
  },
  {
    src: "/images/photo-2.jpg",
    alt: "Worship team leading songs at The Temple of Charis",
    size: "wide",
  },
  {
    src: "/images/photo-5.jpg",
    alt: "Attendees praising during the conference",
    size: "tall",
  },
  {
    src: "/images/photo-9.jpg",
    alt: "Attendees taking notes during teaching",
    size: "wide",
  },
  {
    src: "/images/photo-6.jpg",
    alt: "Dance ministry during worship",
    size: "tall",
  },
  {
    src: "/images/photo-8.jpg",
    alt: "Spoken word ministry pointing to Jesus",
    size: "tall",
  },
  {
    src: "/images/photo-3.jpg",
    alt: "An attendee listening during the conference",
    size: "tall",
  },
] as const;

const sizes = {
  tall: "h-[min(52vh,26rem)] w-[min(68vw,22rem)] sm:h-[64vh] sm:w-[24rem]",
  wide: "h-[min(36vh,18rem)] w-[min(84vw,36rem)] sm:h-[48vh] sm:w-[40rem]",
};

const SPEED = 36;

export function EditorialGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ x: number; offset: number } | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let last = performance.now();

    const render = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const repeat = track.children[images.length] as HTMLElement | undefined;
      const loop = first && repeat ? repeat.offsetLeft - first.offsetLeft : 0;
      if (loop > 0) {
        offsetRef.current = ((offsetRef.current % loop) + loop) % loop;
      }
      const value = `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.webkitTransform = value;
      track.style.transform = value;
    };

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 64);
      last = now;
      if (!pausedRef.current && !dragRef.current && !prefersReduced) {
        offsetRef.current += (SPEED * elapsed) / 1000;
      }
      render();
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: event.clientX, offset: offsetRef.current };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    offsetRef.current = drag.offset - (event.clientX - drag.x);
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const frames = [...images, ...images];

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-24">
      <div
        className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="flex w-max items-end gap-4 px-5 will-change-transform sm:gap-5 sm:px-8"
        >
          {frames.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              aria-hidden={index >= images.length}
              className={`relative shrink-0 overflow-hidden rounded-2xl ${sizes[image.size]}`}
            >
              <Image
                src={image.src}
                alt={index >= images.length ? "" : image.alt}
                fill
                draggable={false}
                sizes="(max-width: 768px) 84vw, 40rem"
                className="pointer-events-none object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
