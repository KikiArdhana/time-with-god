"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import { fill } from "@/lib/i18n";
import { totalMinutes, type JourneyStep } from "@/lib/journey/generator";
import type { SectionId } from "@/lib/content/types";
import {
  BeStillView,
  ClosingView,
  GratitudeView,
  PrayerView,
  ReflectionView,
  ScriptureView,
  WorshipView,
  type StepProps,
} from "@/components/journey/SectionViews";

const VIEWS: Record<SectionId, (p: StepProps) => ReactElement | null> = {
  "be-still": BeStillView,
  scripture: ScriptureView,
  worship: WorshipView,
  reflection: ReflectionView,
  gratitude: GratitudeView,
  prayer: PrayerView,
  closing: ClosingView,
};

export default function JourneyPage() {
  const router = useRouter();
  const { t } = useSettings();
  const { ready, active, completePlan } = useSession();

  const [index, setIndex] = useState(0);
  const [completedId, setCompletedId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<{ steps: JourneyStep[]; minutes: number } | null>(
    null,
  );
  const completedRef = useRef(false);

  const steps = active?.steps ?? [];
  const atCompletion = active !== null && index >= steps.length && steps.length > 0;

  // Redirect if someone lands here with no plan in progress.
  useEffect(() => {
    if (ready && !active && !completedId) {
      router.replace("/begin");
    }
  }, [ready, active, completedId, router]);

  // When the last section is passed, finish and save exactly once.
  useEffect(() => {
    if (atCompletion && !completedRef.current && active) {
      completedRef.current = true;
      setSnapshot({ steps: active.steps, minutes: totalMinutes(active.steps) });
      const id = completePlan();
      setCompletedId(id);
    }
  }, [atCompletion, active, completePlan]);

  const next = () => setIndex((i) => i + 1);

  const completionSteps = useMemo(() => snapshot?.steps ?? [], [snapshot]);

  if (!ready) {
    return (
      <div className="app-frame flex min-h-[100dvh] items-center justify-center">
        <p className="animate-fade-in-slow text-sm text-faint">{t.appName}</p>
      </div>
    );
  }

  // Completion screen
  if (completedId && snapshot) {
    return (
      <div className="app-frame flex min-h-[100dvh] flex-col items-center px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-1 flex-col items-center justify-center text-center animate-fade-in">
          <h1 className="font-display text-3xl text-ink">{t.complete.title}</h1>

          <div className="my-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 text-ink shadow-soft">
            <Check size={34} strokeWidth={2.5} />
          </div>

          <p className="text-[15px] leading-relaxed text-muted">
            {fill(t.complete.spent, { n: snapshot.minutes })}
          </p>
          <p className="mt-1 text-[15px] text-ink">{t.complete.wellDone}</p>

          <ul className="mt-8 w-full max-w-[280px] space-y-2">
            {completionSteps.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-xl bg-cream/70 px-4 py-2.5"
              >
                <span className="text-[15px] text-ink">{t.sections[s.id]}</span>
                <Check size={16} className="text-gold-500" />
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full space-y-3">
          <Button full onClick={() => router.replace(`/summary?id=${completedId}`)}>
            {t.complete.viewSummary}
          </Button>
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mx-auto block min-h-[40px] px-4 text-sm text-faint transition-colors hover:text-muted"
          >
            {t.common.finish}
          </button>
        </div>
      </div>
    );
  }

  if (!active || steps.length === 0) {
    return (
      <div className="app-frame flex min-h-[100dvh] items-center justify-center">
        <p className="animate-fade-in-slow text-sm text-faint">{t.appName}</p>
      </div>
    );
  }

  const step = steps[Math.min(index, steps.length - 1)];
  const View = VIEWS[step.id];

  return (
    <View
      key={`${step.id}-${index}`}
      step={step}
      stepIndex={index}
      stepCount={steps.length}
      onBack={index > 0 ? () => setIndex(index - 1) : undefined}
      onNext={next}
    />
  );
}
