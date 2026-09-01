"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SoftTextarea } from "@/components/journey/Prompts";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import { scriptureById } from "@/lib/content";
import type { EntryType } from "@/lib/journey/sections";
import { formatFullDate, formatTime, intentionsLabel } from "@/lib/format";

const ENTRY_ORDER: EntryType[] = ["note", "reflection", "gratitude", "prayer"];

function SummaryInner() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const { t, lang } = useSettings();
  const { ready, getStoredSession, updateSessionNote } = useSession();

  const session = id ? getStoredSession(id) : undefined;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session) setNote(session.note ?? "");
  }, [session?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (ready && !session) {
    return (
      <div className="app-frame flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-[15px] text-muted">{t.summary.empty}</p>
        <Link href="/" className="text-sm text-gold-600 hover:underline">
          {t.nav.today}
        </Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="app-frame flex min-h-[100dvh] items-center justify-center">
        <p className="animate-fade-in-slow text-sm text-faint">{t.appName}</p>
      </div>
    );
  }

  const scripture = scriptureById(session.scriptureId);
  const entryLabel: Record<EntryType, string> = {
    note: t.summary.thoughts,
    reflection: t.summary.reflection,
    gratitude: t.summary.gratitude,
    prayer: t.summary.prayer,
  };

  const save = () => {
    updateSessionNote(session.id, note);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="app-frame min-h-[100dvh] px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="py-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label={t.common.back}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <header className="mt-2 animate-fade-in">
        <h1 className="font-display text-[28px] text-ink">{t.summary.title}</h1>
        <p className="mt-2 text-sm text-muted">{formatFullDate(session.startedAt, lang)}</p>
        <p className="text-sm text-muted">
          {`${session.durationMinutes} ${t.common.minutes} \u00b7 ${intentionsLabel(
            session.intentions,
            lang,
          )}`}
        </p>
        {session.completedAt && (
          <p className="text-sm text-faint">{formatTime(session.startedAt, lang)}</p>
        )}
      </header>

      <div className="mt-6 space-y-3">
        {scripture && (
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {t.summary.scripture}
            </p>
            <p className="mt-1 font-display text-lg text-ink">{scripture.reference[lang]}</p>
          </Card>
        )}

        {ENTRY_ORDER.map((type) => {
          const entry = session.entries.find((e) => e.type === type);
          if (!entry) return null;
          return (
            <Card key={type} className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">
                {entryLabel[type]}
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-ink/90">
                {entry.content}
              </p>
            </Card>
          );
        })}
      </div>

      <section className="mt-6">
        <p className="mb-2 text-sm font-medium text-ink">{t.summary.yourNote}</p>
        <SoftTextarea
          placeholder={t.summary.notePlaceholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="mt-3 flex items-center gap-3">
          <Button onClick={save}>{t.summary.saveNote}</Button>
          {saved && <span className="text-sm text-gold-600">{t.common.saved}</span>}
        </div>
      </section>

      <div className="mt-8">
        <Button variant="outline" full onClick={() => router.push("/")}>
          {t.summary.done}
        </Button>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <Suspense
      fallback={
        <div className="app-frame flex min-h-[100dvh] items-center justify-center">
          <span className="text-sm text-faint">Time With God</span>
        </div>
      }
    >
      <SummaryInner />
    </Suspense>
  );
}
