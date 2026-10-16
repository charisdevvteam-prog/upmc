import type { Metadata } from "next";
import Link from "next/link";
import { AddToCalendarButton } from "@/components/add-to-calendar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn } from "@/lib/btn";
import { church, conferenceSchedule } from "@/lib/content";

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
          {church.shortName} on {conferenceSchedule.summary}.
        </p>
        <p className="mt-4 max-w-xl text-base leading-[1.4] tracking-[-0.02em] text-[#6b6b6b] sm:text-lg">
          This opens your calendar with the conference details. Tap Save to add
          it. Both days are included (Saturday and Sunday, 3:00 PM).
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-fit sm:flex-row">
          <AddToCalendarButton />
          <Link
            href="/"
            className={btn({ variant: "outline-secondary", size: "lg" })}
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
