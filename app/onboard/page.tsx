"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Screen, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CrossMark, SunMark } from "@/components/ui/Logo";
import { useSettings } from "@/lib/store/settings-context";
import { useOnboarding } from "@/lib/store/onboarding-context";
import { selectDailyVerse } from "@/lib/content";

export default function OnboardPage() {
  const router = useRouter();
  const { t, lang } = useSettings();
  const { complete } = useOnboarding();
  const [name, setName] = useState("");

  const verse = selectDailyVerse();
  const verseLines = verse.verses.en.slice(0, 2);

  const begin = () => {
    complete(name.trim());
    router.replace("/");
  };

  return (
    <Screen>
      <div className="flex min-h-[calc(100dvh-2.5rem)] flex-col items-center justify-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-breathe rounded-full bg-gold-100" />
          <CrossMark className="relative h-11 w-11 animate-fade-in-slow" />
        </div>

        <div className="mt-6 flex items-center gap-2 animate-fade-in">
          <SunMark className="h-6 w-6" />
          <span className="font-display text-lg text-ink">{t.appName}</span>
        </div>

        <h1 className="mt-3 max-w-xs font-display text-[26px] leading-snug text-ink animate-fade-in">
          {t.philosophy}
        </h1>
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted animate-fade-in">
          {t.welcome.subtitle}
        </p>

        <Card className="mt-8 w-full max-w-xs p-4 text-left animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            {t.onboard.verseLabel}
          </p>
          <p className="mt-2 font-display text-[17px] leading-relaxed text-ink">
            {verseLines.map((v) => v.t).join(" ")}
          </p>
          <p className="mt-2 text-sm text-muted">{verse.reference[lang]}</p>
        </Card>

        <div className="mt-8 w-full max-w-xs">
          <label className="block text-left text-sm text-muted" htmlFor="onboard-name">
            {t.onboard.nameQuestion}
          </label>
          <input
            id="onboard-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.onboard.namePlaceholder}
            className="mt-2 w-full rounded-full border border-line bg-cream px-4 py-2.5 text-[15px] text-ink"
          />
        </div>

        <div className="mt-8 w-full max-w-xs space-y-3">
          <Button full onClick={begin}>
            {t.onboard.begin}
            <ArrowRight size={18} />
          </Button>
          <Link
            href="/settings"
            className="mx-auto block min-h-[40px] px-4 text-sm text-muted transition-colors hover:text-ink"
          >
            {t.welcome.haveAccount}
          </Link>
        </div>
      </div>
    </Screen>
  );
}
