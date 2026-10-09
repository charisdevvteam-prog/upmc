import { RevealGroup, RevealItem } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  return (
    <RevealGroup
      stagger={0.18}
      className={align === "center" ? "text-center" : undefined}
    >
      <RevealItem>
        <p
          className={
            tone === "dark"
              ? "text-xl leading-[0.9] font-medium tracking-[-0.04em] text-white sm:text-[1.875rem]"
              : "text-xl leading-[0.9] font-medium tracking-[-0.04em] text-zinc-950 sm:text-[1.875rem]"
          }
        >
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-accent">
          {title}
        </h2>
      </RevealItem>
    </RevealGroup>
  );
}
