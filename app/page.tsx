"use client";

export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Screen, Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/ui/BottomNav";
import { SunMark } from "@/components/ui/Logo";
import { useSettings } from "@/lib/store/settings-context";
import { useSession } from "@/lib/store/session-context";
import { useOnboarding } from "@/lib/store/onboarding-context";
import { formatDay, intentionsLabel } from "@/lib/format";

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isComplete, hydrated } = useOnboarding();

  useEffect(() => {
    if (hydrated && !isComplete) {
      router.replace("/onboard");
    }
  }, [hydrated, isComplete, router]);

  if (!hydrated || !isComplete) {
    return null;
  }

  return <>{children}</>;
}

export default function TodayPage() {
  const { t, lang } = useSettings();
  const { sessions, active } = useSession();
  const recent = sessions.filter((s) => s.completedAt).slice(0, 3);

  return (
    <OnboardingGuard>
      <Screen withNav>
        {/* Identity */}
        <div className="flex items-center gap-2.5 pt-1">
          <SunMark className="h-7 w-7" />
          <span className="font-display text-lg text-ink">{t.appName}</span>
        </div>

        {/* Hero */}
        <section className="mt-8">
          <h1 className="font-display text-[34px] leading-[1.15] text-ink">
            {t.today.greeting}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {t.welcome.subtitle}
          </p>

          <div className="mt-6 space-y-3">
            {active && (
              <Link href="/journey">
                <Card className="flex items-center justify-between p-4 transition-colors hover:border-gold-300">
                  <span className="text-[15px] font-medium text-ink">
                    {t.today.continueSession}
                  </span>
                  <ArrowRight size={18} className="text-gold-600" />
                </Card>
              </Link>
            )}

            <Link
              href="/begin"
              className="flex min-h-[56px] w-full items-center justify-between rounded-full bg-gold-400 px-6 text-ink shadow-soft transition-colors hover:bg-gold-500"
            >
              <span className="text-[16px] font-medium">{t.today.start}</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Recent moments */}
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-faint">
              {t.today.recent}
            </h2>
            {recent.length > 0 && (
              <Link href="/history" className="text-sm text-gold-600 hover:underline">
                {t.today.viewAll}
              </Link>
            )}
          </div>

          {recent.length === 0 ? (
            <Card className="p-5">
              <p className="text-[15px] leading-relaxed text-muted">{t.today.none}</p>
            </Card>
          ) : (
            <ul className="space-y-2.5">
              {recent.map((s) => (
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
                      <ArrowRight size={16} className="text-faint" />
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Screen>
      <BottomNav />
    </OnboardingGuard>
  );
}
