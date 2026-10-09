"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  tall: "h-[min(52svh,26rem)] w-[min(68vw,22rem)] sm:h-[64svh] sm:w-[24rem]",
  wide: "h-[min(36svh,18rem)] w-[min(84vw,36rem)] sm:h-[48svh] sm:w-[40rem]",
};

export function EditorialGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tick = () => {
      if (!pausedRef.current && !prefersReduced) {
        const loopAt = scroller.scrollWidth / 2;
        scroller.scrollLeft += 0.6;
        if (scroller.scrollLeft >= loopAt) {
          scroller.scrollLeft -= loopAt;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const frames = [...images, ...images];

  return (
    <section className="bg-white py-12 sm:py-24">
      <div
        ref={scrollerRef}
        className="editorial-scroller flex items-end gap-4 px-5 pb-2 sm:gap-5 sm:px-8"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {frames.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={`relative shrink-0 snap-start overflow-hidden rounded-2xl ${sizes[image.size]}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 80vw, 40rem"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
