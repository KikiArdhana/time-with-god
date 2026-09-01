import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "soft" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none " +
  "min-h-[52px] px-6 text-[15px] select-none active:scale-[0.99]";

const variants: Record<Variant, string> = {
  primary: "bg-gold-400 text-ink hover:bg-gold-500 shadow-soft",
  soft: "bg-gold-100 text-ink hover:bg-gold-200",
  ghost: "min-h-[44px] text-muted hover:text-ink",
  outline: "border border-line bg-cream text-ink hover:border-gold-300",
};

export function Button({
  variant = "primary",
  full = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}
