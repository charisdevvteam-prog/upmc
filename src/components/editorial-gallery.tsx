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
const RESUME_AFTER = 2500;
const COPIES = 3;

export function EditorialGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const touchingRef = useRef(false);
  const hoveringRef = useRef(false);
  const resumeAtRef = useRef(0);
  const dragRef = useRef<{ x: number; left: number } | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const loopWidth = () => {
      const first = scroller.children[0] as HTMLElement | undefined;
      const repeat = scroller.children[images.length] as HTMLElement | undefined;
      return first && repeat ? repeat.offsetLeft - first.offsetLeft : 0;
    };

    const wrap = (value: number) => {
      const loop = loopWidth();
      if (loop <= 0) return value;
      if (value < loop * 0.5) return value + loop;
      if (value > loop * 1.5) return value - loop;
      return value;
    };

    positionRef.current = loopWidth();
    scroller.scrollLeft = positionRef.current;

    const holdAuto = () => {
      resumeAtRef.current = performance.now() + RESUME_AFTER;
    };
    const onTouchStart = () => {
      touchingRef.current = true;
      holdAuto();
    };
    const onTouchEnd = () => {
      touchingRef.current = false;
      holdAuto();
    };

    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", onTouchEnd, { passive: true });
    scroller.addEventListener("wheel", holdAuto, { passive: true });

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 64);
      last = now;

      const manual =
        touchingRef.current ||
        dragRef.current !== null ||
        now < resumeAtRef.current;

      if (manual) {
        positionRef.current = scroller.scrollLeft;
        if (!touchingRef.current && !dragRef.current) {
          const wrapped = wrap(scroller.scrollLeft);
          if (wrapped !== scroller.scrollLeft) {
            scroller.scrollLeft = wrapped;
            positionRef.current = wrapped;
          }
        }
      } else if (!hoveringRef.current && !prefersReduced) {
        positionRef.current = wrap(
          positionRef.current + (SPEED * elapsed) / 1000,
        );
        scroller.scrollLeft = Math.round(positionRef.current);
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      scroller.removeEventListener("wheel", holdAuto);
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !scrollerRef.current) return;
    dragRef.current = { x: event.clientX, left: scrollerRef.current.scrollLeft };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !scrollerRef.current) return;
    scrollerRef.current.scrollLeft = drag.left - (event.clientX - drag.x);
  };

  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    resumeAtRef.current = performance.now() + RESUME_AFTER;
  };

  const frames = Array.from({ length: COPIES }, () => images).flat();

  return (
    <section className="bg-white py-12 sm:py-24">
      <div
        ref={scrollerRef}
        className="gallery-scroller flex cursor-grab items-end gap-4 px-5 select-none active:cursor-grabbing sm:gap-5 sm:px-8"
        onMouseEnter={() => {
          hoveringRef.current = true;
        }}
        onMouseLeave={() => {
          hoveringRef.current = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
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
    </section>
  );
}
