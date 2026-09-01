"use client";

import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/lib/store/settings-context";

export function SectionShell({
  title,
  minutes,
  stepIndex,
  stepCount,
  onBack,
  onContinue,
  onSkip,
  continueLabel,
  showSkip = true,
  children,
}: {
  title: string;
  minutes?: number;
  stepIndex: number;
  stepCount: number;
  onBack?: () => void;
  onContinue: () => void;
  onSkip?: () => void;
  continueLabel?: string;
  showSkip?: boolean;
  children: ReactNode;
}) {
  const { t } = useSettings();

  return (
    <div className="app-frame flex min-h-[100dvh] flex-col px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      {/* Top bar */}
      <div className="flex items-center justify-between py-2">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          aria-label={t.common.back}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink disabled:opacity-30"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: stepCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === stepIndex
                  ? "w-4 bg-gold-400"
                  : i < stepIndex
                    ? "w-1.5 bg-gold-300"
                    : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <div className="h-9 w-9" />
      </div>

      {/* Heading */}
      <header className="mt-4 animate-fade-in">
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        {typeof minutes === "number" && (
          <p className="mt-1 text-sm text-muted">
            {minutes} {t.common.minutes}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="mt-6 flex-1 animate-fade-in">{children}</div>

      {/* Footer */}
      <div className="mt-6 space-y-3">
        <Button full onClick={onContinue}>
          {continueLabel ?? t.common.continueBtn}
        </Button>
        {showSkip && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="mx-auto block min-h-[40px] px-4 text-sm text-faint transition-colors hover:text-muted"
          >
            {t.common.skip}
          </button>
        )}
      </div>
    </div>
  );
}
