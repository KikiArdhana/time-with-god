"use client";

import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { Screen, Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/ui/BottomNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import type { EntryType } from "@/lib/journey/sections";
import { formatDay } from "@/lib/format";

type Filter = "all" | "notes" | "prayers" | "reflections";

const MATCHES: Record<Filter, (t: EntryType) => boolean> = {
  all: () => true,
  notes: (t) => t === "note" || t === "gratitude",
  prayers: (t) => t === "prayer",
  reflections: (t) => t === "reflection",
};

export default function JournalPage() {
  const { t, lang } = useSettings();
  const { sessions } = useSession();
  const [filter, setFilter] = useState<Filter>("all");

  const entries = useMemo(() => {
    const flat = sessions.flatMap((s) =>
      s.entries.map((e) => ({ entry: e, date: s.date })),
    );
    return flat
      .filter((x) => x.entry.content.trim().length > 0)
      .sort((a, b) => b.entry.createdAt.localeCompare(a.entry.createdAt));
  }, [sessions]);

  const filtered = entries.filter((x) => MATCHES[filter](x.entry.type));

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.journal.all },
    { id: "notes", label: t.journal.notes },
    { id: "prayers", label: t.journal.prayers },
    { id: "reflections", label: t.journal.reflections },
  ];

  const entryLabel: Record<EntryType, string> = {
    note: t.summary.thoughts,
    reflection: t.summary.reflection,
    gratitude: t.summary.gratitude,
    prayer: t.summary.prayer,
  };

  return (
    <>
      <Screen withNav>
        <PageHeader title={t.journal.title} subtitle={t.journal.subtitle} />

        <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === f.id
                  ? "bg-gold-400 text-ink"
                  : "bg-cream text-muted hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-[15px] leading-relaxed text-muted">{t.journal.empty}</p>
          </Card>
        ) : (
          <ul className="space-y-2.5">
            {filtered.map(({ entry, date }) => (
              <li key={entry.id}>
                <Card className="p-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-faint">
                      {entryLabel[entry.type]}
                    </span>
                    <span className="text-xs text-faint">{formatDay(date, lang)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink/90">
                    {entry.content}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-faint">
          <Lock size={12} />
          {t.journal.private}
        </p>
      </Screen>
      <BottomNav />
    </>
  );
}
