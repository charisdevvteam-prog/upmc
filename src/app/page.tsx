import Image from "next/image";
import Link from "next/link";
import { EditorialGallery } from "@/components/editorial-gallery";
import { HeroVideo } from "@/components/hero-video";
import {
  Reveal,
  RevealGroup,
  RevealImage,
  RevealItem,
} from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn } from "@/lib/btn";
import {
  church,
  churchAbout,
  conferenceIntro,
  mission,
  purpose,
  testimonials,
  vision,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />

      <section className="relative isolate hero-min-h flex items-end overflow-hidden bg-black text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-12 sm:px-8 sm:pt-40 sm:pb-24">
          <Reveal immediate delay={0.35} className="max-w-4xl">
            <h1>
              <Image
                src="/images/upmc-wordmark-blue.png"
                alt="Unto a Perfect Man Conference"
                width={1024}
                height={307}
                preload
                className="h-auto w-full max-w-3xl"
              />
            </h1>
          </Reveal>
          <Reveal immediate delay={0.75}>
            <p className="mt-6 max-w-2xl text-xl leading-[1.2] tracking-[-0.04em] text-white/85 sm:text-[1.875rem]">
              We can&apos;t wait to gather with you. Come into the full and exact
              knowledge of Jesus Christ.
            </p>
          </Reveal>
          <RevealGroup
            immediate
            delay={1.05}
            stagger={0.12}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row"
          >
            <RevealItem className="flex flex-col">
              <Link
                href="/register"
                className={btn({ variant: "light", size: "lg" })}
              >
                Register Now
              </Link>
            </RevealItem>
            <RevealItem className="flex flex-col">
              <Link
                href="#about"
                className={btn({ variant: "outline-light", size: "lg" })}
              >
                About the Conference
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section id="about" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20 lg:pt-28">
          <SectionHeading eyebrow="About" title={church.name} />
          <Reveal delay={0.35}>
            <p className="mt-6 text-2xl leading-none font-medium tracking-[-0.04em] text-zinc-950 sm:text-[1.875rem]">
              {church.tagline}
            </p>
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-10 pb-16 sm:gap-12 sm:px-8 sm:pt-12 sm:pb-20 lg:grid-cols-2 lg:items-center lg:pb-28">
          <RevealGroup stagger={0.2}>
            <RevealItem>
              <p className="text-xl leading-[1.2] tracking-[-0.04em] text-[#6b6b6b] sm:text-2xl">
                {churchAbout}
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-xl leading-[1.2] tracking-[-0.04em] text-[#6b6b6b] sm:text-2xl">
                {conferenceIntro}
              </p>
            </RevealItem>
          </RevealGroup>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <RevealImage className="overflow-hidden rounded-2xl">
              <Image
                src="/images/photo-1.jpg"
                alt="Pastor Roy King Grace teaching"
                width={768}
                height={1024}
                className="h-full w-full object-cover"
              />
            </RevealImage>
            <div className="flex flex-col gap-3 sm:gap-4">
              <RevealImage delay={0.2} className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/photo-3.jpg"
                  alt="An attendee listening during the conference"
                  width={768}
                  height={1024}
                  className="h-52 w-full object-cover sm:h-72"
                />
              </RevealImage>
              <RevealImage delay={0.4} className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/photo-8.jpg"
                  alt="Spoken word ministry pointing to Jesus"
                  width={768}
                  height={1024}
                  className="h-32 w-full object-cover sm:h-48"
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <RevealGroup
          stagger={0.22}
          className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-3 md:gap-10 lg:py-24"
        >
          {[
            { label: "Vision", body: vision },
            { label: "Mission", body: mission },
            { label: "Purpose", body: purpose },
          ].map((item) => (
            <RevealItem key={item.label}>
              <h3 className="text-[2.25rem] leading-[0.9] font-semibold text-accent sm:text-[2.6875rem]">
                {item.label}
              </h3>
              <p className="mt-6 text-xl leading-[1.2] tracking-[-0.04em] text-white/85 text-balance sm:text-[1.375rem]">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Reveal>
        <EditorialGallery />
      </Reveal>

      <section id="testimonials" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Testimonials"
            title="What they say about this Conference"
            align="center"
          />
          <RevealGroup
            stagger={0.18}
            className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-5"
          >
            {testimonials.map((item) => (
              <RevealItem key={item.name} className="flex w-full max-w-[22rem]">
                <blockquote className="flex w-full flex-col rounded-[1.75rem] bg-[#edeff3] p-6 sm:p-8">
                  <div className="flex h-14 items-start justify-between gap-4">
                    <p className="text-3xl leading-none font-semibold tracking-[-0.06em]">
                      {item.name}
                    </p>
                    <span
                      aria-hidden
                      className="select-none text-7xl leading-[0.55] font-serif text-[#89b4e6]"
                    >
                      &rdquo;
                    </span>
                  </div>
                  <p className="mt-6 text-base leading-[1.6] tracking-[-0.01em] text-[#6b6b6b] italic sm:mt-8 sm:min-h-[13.5rem]">
                    &ldquo;{item.quote}
                    {item.emphasis ? (
                      <>
                        {" "}
                        <span className="font-semibold not-italic text-zinc-900">
                          {item.emphasis}
                        </span>
                      </>
                    ) : null}
                    {item.after ?? ""}&rdquo;
                  </p>
                </blockquote>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
        <RevealImage className="absolute inset-0 -z-10">
          <Image
            src="/images/photo-2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </RevealImage>
        <div className="relative mx-auto flex max-w-7xl flex-col items-stretch gap-6 px-5 py-20 sm:items-start sm:px-8 sm:py-24 lg:py-32">
          <SectionHeading
            eyebrow="Join us"
            title={`Register for ${church.shortName}`}
            tone="dark"
          />
          <Reveal delay={0.35}>
            <p className="max-w-2xl text-xl leading-[1.2] tracking-[-0.04em] text-white/80 sm:text-[1.875rem]">
              Reserve your place in person or online. Saturday, Sunday, or
              both.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="flex flex-col sm:block">
            <Link
              href="/register"
              className={btn({ variant: "light", size: "lg" })}
            >
              Register Now
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
