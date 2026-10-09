"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { church } from "@/lib/content";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/register", label: "Register" },
];

export function SiteHeader({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlay = variant === "overlay";

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onOutside = (event: Event) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) close();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onOutside, { passive: true });
    document.addEventListener("mousedown", onOutside);
    window.addEventListener("resize", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("resize", onDesktop);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b"
      }
      style={
        overlay
          ? undefined
          : {
              borderColor: "#e4e4e7",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
            }
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={overlay ? "/images/logo-white.png" : "/images/logo-black.png"}
            alt="The Temple of Charis"
            width={766}
            height={837}
            unoptimized
            className="h-11 w-auto"
          />
          <span
            className={
              overlay
                ? "font-heading text-[11px] font-bold tracking-[0.14em] text-white uppercase"
                : "font-heading text-[11px] font-bold tracking-[0.14em] text-zinc-900 uppercase"
            }
          >
            {church.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                overlay
                  ? "font-heading text-sm font-semibold tracking-wide text-white/90 transition-colors hover:text-white"
                  : "font-heading text-sm font-semibold tracking-wide text-zinc-800 transition-colors hover:text-zinc-950"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={
            overlay
              ? "inline-flex size-11 items-center justify-center rounded-full text-white md:hidden"
              : "inline-flex size-11 items-center justify-center rounded-full text-zinc-900 md:hidden"
          }
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="mx-5 rounded-2xl p-6 md:hidden"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.18)",
          }}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 font-heading text-lg font-semibold text-zinc-900"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
