import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { church } from "@/lib/content";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register",
  description: `Register for ${church.conference}.`,
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <SiteHeader variant="solid" />

      <main className="flex-1 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
        <section className="relative isolate overflow-hidden bg-zinc-950 text-white lg:sticky lg:top-[5.3rem] lg:h-[calc(100dvh-5.3rem)]">
          <Image
            src="/images/photo-7.jpg"
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />
          <div className="relative flex min-h-[12rem] flex-col justify-end px-5 pt-12 pb-8 sm:min-h-[30rem] sm:pb-10 sm:px-8 lg:h-full lg:pb-16">
            <p className="text-xl leading-[0.9] font-medium tracking-[-0.04em] sm:text-[1.875rem]">
              Join us
            </p>
            <h1 className="mt-4 text-[clamp(2.75rem,11vw,4.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-accent lg:text-[clamp(2.75rem,5vw,4.5rem)]">
              Register for {church.shortName}
            </h1>
            <p className="mt-5 hidden max-w-md text-lg sm:block leading-[1.25] tracking-[-0.03em] text-white/80 sm:text-xl">
              {church.conference}. In person or online, Saturday, Sunday, or
              both.
            </p>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 sm:py-16 lg:flex lg:items-center lg:px-16 lg:py-24">
          <div className="mx-auto w-full max-w-xl">
            <RegisterForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
