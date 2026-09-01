"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Screen, Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/ui/BottomNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { WeeklyGraph } from "@/components/ui/WeeklyGraph";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import { formatDay, formatTime, intentionsLabel } from "@/lib/format";

export default function HistoryPage() {
  const { t, lang } = useSettings();
  const { sessions } = useSession();
  const completed = sessions.filter((s) => s.completedAt);

  return (
    <>
      <Screen withNav>
        <PageHeader title={t.moments.title} subtitle={t.moments.subtitle} />

        {completed.length > 0 && (
          <div className="mb-6">
            <WeeklyGraph sessions={completed} lang={lang} label={t.moments.weekly} />
          </div>
        )}

        {completed.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-[15px] leading-relaxed text-muted">{t.moments.empty}</p>
          </Card>
        ) : (
          <ul className="space-y-2.5">
            {completed.map((s) => (
              <li key={s.id}>
                <Link href={`/summary?id=${s.id}`}>
                  <Card className="flex items-center justify-between p-4 transition-colors hover:border-gold-300">
                    <div>
                      <p className="text-[15px] font-medium text-ink">
                        {formatDay(s.date, lang)}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {`${s.durationMinutes} ${t.common.minuteShort} \u00b7 ${intentionsLabel(
                          s.intentions,
                          lang,
                        )}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-faint">
                        {formatTime(s.startedAt, lang)}
                      </span>
                      <ArrowRight size={16} className="text-faint" />
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Screen>
      <BottomNav />
    </>
  );
}
