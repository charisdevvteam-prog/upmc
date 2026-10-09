import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn } from "@/lib/btn";
import { church } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your registration was successful.",
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <SiteHeader variant="solid" />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-xl leading-[0.9] font-medium tracking-[-0.04em] text-zinc-950 sm:text-[1.875rem]">
          You&apos;re registered
        </p>
        <h1 className="mt-4 text-[clamp(3rem,13vw,7rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-accent">
          Thank You!
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-[1.2] tracking-[-0.04em] text-[#6b6b6b] sm:text-[1.875rem]">
          Your registration was successful. We can&apos;t wait to see you at{" "}
          {church.shortName}.
        </p>
        <Link
          href="/"
          className={`mt-10 w-full sm:w-fit ${btn({ variant: "primary", size: "lg" })}`}
        >
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
