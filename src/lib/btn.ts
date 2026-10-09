const base =
  "inline-flex items-center justify-center border text-center font-normal leading-normal tracking-normal whitespace-nowrap select-none shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.18)] transition-[color,background-color,border-color,box-shadow,translate,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_14px_28px_-8px_rgba(0,0,0,0.32)] active:translate-y-0 active:scale-[0.96] active:shadow-[0_1px_2px_rgba(0,0,0,0.16)] active:duration-100 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-65 disabled:shadow-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const sizes = {
  md: "rounded-full px-4 py-1.5 text-base",
  lg: "rounded-full px-6 py-2 text-xl",
};

const variants = {
  primary:
    "border-accent bg-accent text-zinc-950 hover:border-[#6e91b8] hover:bg-[#749ac4] focus-visible:ring-accent/50 active:bg-[#6e91b8]",
  "outline-primary":
    "border-accent bg-transparent text-zinc-900 hover:bg-accent hover:text-zinc-950 focus-visible:ring-accent/50 active:border-[#6e91b8] active:bg-[#6e91b8]",
  light:
    "border-[#f8f9fa] bg-[#f8f9fa] text-black hover:border-[#c6c7c8] hover:bg-[#d3d4d5] focus-visible:ring-[#d3d4d5]/50 active:bg-[#c6c7c8]",
  "outline-light":
    "border-[#f8f9fa] bg-transparent text-[#f8f9fa] hover:border-accent hover:bg-accent hover:text-zinc-950 focus-visible:ring-accent/50 active:border-[#6e91b8] active:bg-[#6e91b8]",
  dark: "border-[#212529] bg-[#212529] text-white hover:border-[#373b3e] hover:bg-[#424649] focus-visible:ring-[#424649]/50 active:bg-[#373b3e]",
  "outline-secondary":
    "border-[#6c757d] bg-transparent text-[#6c757d] hover:bg-[#6c757d] hover:text-white focus-visible:ring-[#6c757d]/50 active:bg-[#5c636a]",
};

export function btn({
  variant = "primary",
  size = "md",
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} = {}) {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}
