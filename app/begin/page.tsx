"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import { themes } from "@/lib/content";
import type { ThemeId, SectionId } from "@/lib/content/types";
import { fill } from "@/lib/i18n";
import {
  DURATION_OPTIONS,
  SECTION_MIN_MINUTES,
  generateJourney,
  snapToDuration,
  totalMinutes,
  type JourneyStep,
} from "@/lib/journey/generator";

type Step = "time" | "intention" | "suggested" | "customize";

export default function BeginPage() {
  const router = useRouter();
  const { t, lang, defaultDuration } = useSettings();
  const { createPlan, setSteps } = useSession();

  const [step, setStep] = useState<Step>("time");
  const [duration, setDuration] = useState<number>(snapToDuration(defaultDuration));
  const [intentions, setIntentions] = useState<ThemeId[]>([]);
  const [plan, setPlan] = useState<JourneyStep[]>([]);

  const durationIndex = DURATION_OPTIONS.indexOf(duration as (typeof DURATION_OPTIONS)[number]);

  const goBack = () => {
    if (step === "time") router.push("/");
    else if (step === "intention") setStep("time");
    else if (step === "suggested") setStep("intention");
    else setStep("suggested");
  };

  const toggleIntention = (id: ThemeId) => {
    setIntentions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const buildPlan = () => {
    const primary = intentions[0] ?? "unsure";
    setPlan(generateJourney(duration, primary));
    setStep("suggested");
  };

  const begin = (steps: JourneyStep[]) => {
    createPlan({ durationMinutes: duration, intentions });
    setSteps(steps);
    router.push("/journey");
  };

  const adjustStep = (id: SectionId, delta: number) => {
    setPlan((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, minutes: Math.max(SECTION_MIN_MINUTES, s.minutes + delta) } : s,
      ),
    );
  };

  return (
    <div className="app-frame flex min-h-[100dvh] flex-col px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <div className="py-2">
        <button
          type="button"
          onClick={goBack}
          aria-label={t.common.back}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {step === "time" && (
        <div className="flex flex-1 flex-col animate-fade-in">
          <h1 className="font-display text-[28px] leading-snug text-ink">
            {t.time.question}
          </h1>
          <p className="mt-2 text-sm text-muted">{t.time.help}</p>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex h-52 w-52 flex-col items-center justify-center rounded-full border border-line bg-cream shadow-card">
              <span className="font-display text-6xl text-ink">{duration}</span>
              <span className="mt-1 text-sm text-muted">{t.time.unit}</span>
            </div>

            <div className="mt-8 flex items-center gap-8">
              <button
                type="button"
                onClick={() =>
                  setDuration(DURATION_OPTIONS[Math.max(0, durationIndex - 1)])
                }
                aria-label="Less time"
                disabled={durationIndex <= 0}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-cream text-ink shadow-soft disabled:opacity-30"
              >
                <Minus size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setDuration(
                    DURATION_OPTIONS[Math.min(DURATION_OPTIONS.length - 1, durationIndex + 1)],
                  )
                }
                aria-label="More time"
                disabled={durationIndex >= DURATION_OPTIONS.length - 1}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-cream text-ink shadow-soft disabled:opacity-30"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-8 w-full max-w-[300px]">
              <input
                type="range"
                min={0}
                max={DURATION_OPTIONS.length - 1}
                step={1}
                value={durationIndex}
                onChange={(e) => setDuration(DURATION_OPTIONS[Number(e.target.value)])}
                aria-label={t.time.unit}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-faint">
                {DURATION_OPTIONS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          <Button full onClick={() => setStep("intention")}>
            {t.common.continueBtn}
          </Button>
        </div>
      )}

      {step === "intention" && (
        <div className="flex flex-1 flex-col animate-fade-in">
          <h1 className="font-display text-[28px] leading-snug text-ink">
            {t.intention.question}
          </h1>
          <p className="mt-2 text-sm text-muted">{t.intention.help}</p>

          <ul className="mt-6 flex-1 space-y-2.5">
            {themes.map((theme) => {
              const selected = intentions.includes(theme.id);
              return (
                <li key={theme.id}>
                  <button
                    type="button"
                    onClick={() => toggleIntention(theme.id)}
                    aria-pressed={selected}
                    className={`flex w-full items-center justify-between rounded-2xl border bg-cream px-4 py-3.5 text-left transition-colors ${
                      selected ? "border-gold-400 bg-gold-50" : "border-line/70 hover:border-gold-200"
                    }`}
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-ink">
                        {theme.label[lang]}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted">
                        {theme.description[lang]}
                      </span>
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-gold-400 bg-gold-400 text-ink"
                          : "border-line text-transparent"
                      }`}
                    >
                      <Check size={15} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Button full onClick={buildPlan} disabled={intentions.length === 0}>
            {t.common.continueBtn}
          </Button>
        </div>
      )}

      {step === "suggested" && (
        <div className="flex flex-1 flex-col animate-fade-in">
          <h1 className="font-display text-[26px] leading-snug text-ink">
            {fill(t.suggest.timeLine, { n: duration })}
          </h1>

          <p className="mt-4 text-sm text-muted">{t.suggest.intentionIntro}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {intentions.map((id) => (
              <span
                key={id}
                className="rounded-full bg-gold-100 px-3 py-1 text-[13px] text-ink"
              >
                {themes.find((th) => th.id === id)?.label[lang]}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-muted">{t.suggest.oneWay}</p>

          <Card className="mt-5 flex-1 p-2">
            <p className="px-3 pt-3 font-display text-lg text-ink">{t.suggest.heading}</p>
            <ul className="mt-2 divide-y divide-line/60">
              {plan.map((s) => (
                <li key={s.id} className="flex items-center justify-between px-3 py-3">
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gold-300" />
                    <span className="text-[15px] text-ink">{t.sections[s.id]}</span>
                  </span>
                  <span className="text-sm tabular-nums text-muted">
                    {s.minutes} {t.common.minuteShort}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-5 space-y-3">
            <Button full onClick={() => begin(plan)}>
              {t.suggest.begin}
            </Button>
            <button
              type="button"
              onClick={() => setStep("customize")}
              className="mx-auto block min-h-[40px] px-4 text-sm text-muted transition-colors hover:text-ink"
            >
              {t.common.customize}
            </button>
          </div>
        </div>
      )}

      {step === "customize" && (
        <div className="flex flex-1 flex-col animate-fade-in">
          <h1 className="font-display text-[26px] leading-snug text-ink">
            {t.customize.title}
          </h1>
          <p className="mt-2 text-sm text-muted">{t.customize.help}</p>

          <ul className="mt-6 flex-1 space-y-2.5">
            {plan.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-2xl border border-line/70 bg-cream px-4 py-3"
              >
                <span className="text-[15px] text-ink">{t.sections[s.id]}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => adjustStep(s.id, -1)}
                    aria-label={`${t.sections[s.id]} -1`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-gold-300"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-14 text-center text-sm tabular-nums text-ink">
                    {s.minutes} {t.common.minuteShort}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjustStep(s.id, 1)}
                    aria-label={`${t.sections[s.id]} +1`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-gold-300"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-4 mt-2 flex items-center justify-between px-1">
            <span className="text-sm font-medium text-muted">{t.customize.total}</span>
            <span className="font-display text-lg text-ink">
              {totalMinutes(plan)} {t.common.minuteShort}
            </span>
          </div>

          <div className="space-y-3">
            <Button full onClick={() => begin(plan)}>
              {t.customize.save}
            </Button>
            <button
              type="button"
              onClick={() => setPlan(generateJourney(duration, intentions[0] ?? "unsure"))}
              className="mx-auto block min-h-[40px] px-4 text-sm text-faint transition-colors hover:text-muted"
            >
              {t.customize.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
