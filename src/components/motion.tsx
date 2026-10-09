"use client";

import {
  MotionConfig,
  motion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";

export const easeLuxe = [0.16, 1, 0.3, 1] as const;

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: easeLuxe, ...(delay ? { delay } : {}) },
  }),
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.12,
    clipPath: "inset(14% 0% 0% 0%)",
  },
  visible: (delay?: number) => ({
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.8, ease: easeLuxe, ...(delay ? { delay } : {}) },
  }),
};

function trigger(immediate: boolean) {
  return immediate
    ? ({ animate: "visible" } as const)
    : ({ whileInView: "visible", viewport } as const);
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  immediate?: boolean;
};

export function Reveal({ delay, immediate = false, ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      {...trigger(immediate)}
      {...props}
    />
  );
}

export function RevealImage({
  delay,
  immediate = false,
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={imageReveal}
      custom={delay}
      initial="hidden"
      {...trigger(immediate)}
      {...props}
    />
  );
}

export function RevealGroup({
  stagger = 0.14,
  delay,
  immediate = false,
  ...props
}: RevealProps & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      {...trigger(immediate)}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...props}
    />
  );
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeUp} {...props} />;
}

export function RevealImageItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={imageReveal} {...props} />;
}
