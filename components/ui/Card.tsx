import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-line/70 bg-cream shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/** Full-height mobile app column, centered on wide screens. */
export function Screen({
  children,
  className = "",
  withNav = false,
}: {
  children: ReactNode;
  className?: string;
  withNav?: boolean;
}) {
  return (
    <main
      className={`app-frame min-h-[100dvh] px-5 pt-[max(1.25rem,env(safe-area-inset-top))] ${
        withNav ? "pb-28" : "pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      } ${className}`}
    >
      {children}
    </main>
  );
}
