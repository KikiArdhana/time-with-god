import type { Lang } from "@/lib/content/types";
import type { StoredSession } from "@/lib/store/types";
import { localeTag } from "@/lib/i18n";

/** A quiet bar chart of minutes spent with God over the last 7 days. */
export function WeeklyGraph({
  sessions,
  lang,
  label,
}: {
  sessions: StoredSession[];
  lang: Lang;
  label: string;
}) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate(),
    ).padStart(2, "0")}`;
    const minutes = sessions
      .filter((s) => s.completedAt && s.date === key)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    const weekday = new Intl.DateTimeFormat(localeTag(lang), { weekday: "narrow" }).format(date);
    return { key, minutes, weekday };
  });

  const max = Math.max(1, ...days.map((d) => d.minutes));

  return (
    <div className="rounded-2xl border border-line/70 bg-cream p-4 shadow-card">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-faint">{label}</p>
      <div className="flex items-end justify-between gap-2" style={{ height: 96 }}>
        {days.map((d, i) => (
          <div key={d.key} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div className="flex h-20 w-full items-end justify-center">
              <div
                className="w-full max-w-[22px] origin-bottom animate-grow-up rounded-full bg-gold-400"
                style={{
                  height: `${Math.max(6, (d.minutes / max) * 100)}%`,
                  animationDelay: `${i * 60}ms`,
                  opacity: d.minutes > 0 ? 1 : 0.25,
                }}
                title={`${d.minutes} min`}
              />
            </div>
            <span className="text-[11px] text-faint">{d.weekday}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
