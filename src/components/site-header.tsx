"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const overlay = variant === "overlay";

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur"
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
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {open ? (
        <div className="mx-5 rounded-2xl bg-white p-6 shadow-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-lg font-semibold text-zinc-900"
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
