"use client";

import { useState } from "react";
import { ExternalLink, Minus, Plus, Sparkles } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { PromptList, SoftTextarea } from "./Prompts";
import { MusicPlayer } from "./MusicPlayer";
import { SongPicker } from "./SongPicker";
import { ScriptureReaderSheet } from "./ScriptureReaderSheet";
import { CircularTimer } from "@/components/ui/CircularTimer";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import type { JourneyStep } from "@/lib/journey/generator";
import { SECTION_MIN_MINUTES } from "@/lib/journey/generator";
import {
  fill,
} from "@/lib/i18n";
import {
  fullChapterUrl,
  scriptureById,
  selectGratitudePrompts,
  selectPrayerPrompts,
  selectReflectionPrompts,
  selectWorship,
  worshipByLang,
} from "@/lib/content";
import { fmtBlessingRef } from "@/lib/content/closing";

export interface StepProps {
  step: JourneyStep;
  stepIndex: number;
  stepCount: number;
  onBack?: () => void;
  onNext: () => void;
}

export function BeStillView(props: StepProps) {
  const { t } = useSettings();
  return (
    <SectionShell
      title={t.sections["be-still"]}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <div className="flex flex-col items-center">
        <div className="mb-8 space-y-2 text-center">
          {t.beStill.lines.map((line) => (
            <p key={line} className="text-[15px] leading-relaxed text-muted">
              {line}
            </p>
          ))}
        </div>
        <CircularTimer seconds={props.step.minutes * 60} />
      </div>
    </SectionShell>
  );
}

export function ScriptureView(props: StepProps) {
  const { t, lang } = useSettings();
  const { active, setEntry, getEntry } = useSession();
  const scripture = active ? scriptureById(active.scriptureId) : undefined;
  const [reading, setReading] = useState(false);
  if (!scripture) return null;

  const verses = scripture.verses[lang] ?? scripture.verses.en;
  const showNote = lang === "id" && !scripture.verses.id;

  return (
    <>
    {reading && <ScriptureReaderSheet scripture={scripture} onClose={() => setReading(false)} />}
    <SectionShell
      title={t.sections.scripture}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <p className="font-display text-xl text-ink">{scripture.reference[lang]}</p>

      <div className="mt-4 space-y-2.5 text-[15.5px] leading-relaxed text-ink/90">
        {verses.map((v) => (
          <p key={v.v}>
            <sup className="mr-1 align-super text-[11px] font-medium text-gold-600">
              {v.v}
            </sup>
            {v.t}
          </p>
        ))}
      </div>

      {showNote && (
        <p className="mt-3 rounded-xl bg-paper/70 px-3 py-2 text-xs text-muted">
          {fill(t.scripture.translationNote, { translation: scripture.translation.en })}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-faint">{t.scripture.take}</span>
        {lang === "en" ? (
          <button
            type="button"
            onClick={() => setReading(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:underline"
          >
            {t.scripture.readFull}
          </button>
        ) : (
          <a
            href={fullChapterUrl(scripture, lang)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:underline"
          >
            {t.scripture.readFull}
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <p className="mt-6 text-[15px] text-ink">{t.scripture.prompt}</p>
      <SoftTextarea
        className="mt-3"
        placeholder={t.scripture.placeholder}
        value={getEntry("scripture")}
        onChange={(e) => setEntry("scripture", "note", e.target.value)}
      />
    </SectionShell>
    </>
  );
}

export function WorshipView(props: StepProps) {
  const { t, effectiveMusicLang, backgroundMusic } = useSettings();
  const { active, setSteps } = useSession();
  const [source, setSource] = useState<"ambient" | "popular">("ambient");
  const tracks = worshipByLang(effectiveMusicLang);
  // Start playlist on the day's suggested track.
  const suggested = selectWorship(effectiveMusicLang);
  const ordered = [
    ...tracks.filter((tr) => tr.id === suggested.id),
    ...tracks.filter((tr) => tr.id !== suggested.id),
  ];

  const adjust = (delta: number) => {
    if (!active) return;
    setSteps(
      active.steps.map((s) =>
        s.id === "worship"
          ? { ...s, minutes: Math.max(SECTION_MIN_MINUTES, s.minutes + delta) }
          : s,
      ),
    );
  };

  return (
    <SectionShell
      title={t.sections.worship}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <p className="mb-5 text-[15px] leading-relaxed text-muted">{t.worship.line}</p>

      <div className="mb-4 inline-flex rounded-full bg-paper p-1">
        <button
          type="button"
          onClick={() => setSource("ambient")}
          aria-pressed={source === "ambient"}
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            source === "ambient" ? "bg-cream text-ink shadow-soft" : "text-muted"
          }`}
        >
          {t.worship.ambient}
        </button>
        <button
          type="button"
          onClick={() => setSource("popular")}
          aria-pressed={source === "popular"}
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            source === "popular" ? "bg-cream text-ink shadow-soft" : "text-muted"
          }`}
        >
          {t.worship.popular}
        </button>
      </div>

      {source === "ambient" ? (
        <>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">
            {t.worship.songLabel}
          </p>
          <MusicPlayer tracks={ordered} autoPlay={backgroundMusic} />
        </>
      ) : (
        <SongPicker initialLang={effectiveMusicLang} />
      )}

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-line/70 bg-cream px-4 py-3">
        <span className="text-sm text-muted">{t.worship.adjustTime}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => adjust(-1)}
            aria-label="-1 minute"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-gold-300"
          >
            <Minus size={16} />
          </button>
          <span className="w-14 text-center text-sm tabular-nums text-ink">
            {props.step.minutes} {t.common.minuteShort}
          </span>
          <button
            type="button"
            onClick={() => adjust(1)}
            aria-label="+1 minute"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-gold-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}

export function ReflectionView(props: StepProps) {
  const { t, lang } = useSettings();
  const { active, setEntry, getEntry } = useSession();
  const prompts = selectReflectionPrompts(active?.primaryIntention ?? "unsure");

  return (
    <SectionShell
      title={t.sections.reflection}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <p className="text-[15px] leading-relaxed text-muted">{t.reflection.intro}</p>
      <p className="mt-5 mb-3 text-sm text-ink/80">{t.reflection.consider}</p>
      <ReflectPromptList prompts={prompts} lang={lang} />
      <SoftTextarea
        className="mt-5"
        placeholder={t.reflection.placeholder}
        value={getEntry("reflection")}
        onChange={(e) => setEntry("reflection", "reflection", e.target.value)}
      />
    </SectionShell>
  );
}

function ReflectPromptList({
  prompts,
  lang,
}: {
  prompts: ReturnType<typeof selectReflectionPrompts>;
  lang: "en" | "id";
}) {
  return (
    <ul className="space-y-2.5">
      {prompts.map((p) => (
        <li key={p.id} className="flex items-start gap-3 text-[15px] text-ink/90">
          <Sparkles size={15} className="mt-1 shrink-0 text-gold-500" />
          <span>{p.text[lang]}</span>
        </li>
      ))}
    </ul>
  );
}

export function GratitudeView(props: StepProps) {
  const { t, lang } = useSettings();
  const { active, setEntry, getEntry } = useSession();
  const prompts = selectGratitudePrompts(active?.primaryIntention ?? "unsure");

  return (
    <SectionShell
      title={t.sections.gratitude}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <p className="text-[15px] text-ink">{t.gratitude.question}</p>
      <p className="mt-5 mb-3 text-sm text-ink/80">{t.gratitude.consider}</p>
      <PromptList prompts={prompts} lang={lang} />
      <SoftTextarea
        className="mt-5"
        placeholder={t.gratitude.placeholder}
        value={getEntry("gratitude")}
        onChange={(e) => setEntry("gratitude", "gratitude", e.target.value)}
      />
    </SectionShell>
  );
}

export function PrayerView(props: StepProps) {
  const { t, lang } = useSettings();
  const { active, setEntry, getEntry } = useSession();
  const prompts = selectPrayerPrompts(active?.primaryIntention ?? "unsure");

  return (
    <SectionShell
      title={t.sections.prayer}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
    >
      <p className="text-[15px] leading-relaxed text-muted">{t.prayer.intro}</p>
      <p className="mt-5 mb-3 text-sm text-ink/80">{t.prayer.consider}</p>
      <PromptList prompts={prompts} lang={lang} />
      <SoftTextarea
        className="mt-5"
        placeholder={t.prayer.placeholder}
        value={getEntry("prayer")}
        onChange={(e) => setEntry("prayer", "prayer", e.target.value)}
      />
      <p className="mt-4 text-sm text-faint">{t.journey.noRush}</p>
    </SectionShell>
  );
}

export function ClosingView(props: StepProps) {
  const { t, lang } = useSettings();
  const blessing = [
    "Yahweh bless you, and keep you.",
    "Yahweh make his face to shine on you, and be gracious to you.",
    "Yahweh lift up his face toward you, and give you peace.",
  ];

  return (
    <SectionShell
      title={t.sections.closing}
      minutes={props.step.minutes}
      stepIndex={props.stepIndex}
      stepCount={props.stepCount}
      onBack={props.onBack}
      onContinue={props.onNext}
      onSkip={props.onNext}
      continueLabel={t.common.continueBtn}
    >
      <p className="text-[15px] leading-relaxed text-muted">{t.closing.intro}</p>

      <div className="mt-6 rounded-2xl border border-line/70 bg-cream p-6 text-center shadow-card">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-faint">
          {t.closing.blessingLabel}
        </p>
        <div className="space-y-2 font-display text-lg leading-relaxed text-ink">
          {blessing.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{fmtBlessingRef(lang)}</p>
        <p className="mt-6 font-display text-xl text-gold-600">{t.closing.amen}</p>
      </div>
    </SectionShell>
  );
}
