"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Screen, Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/ui/BottomNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { useSettings, type MusicLangPref } from "@/lib/store/settings-context";
import { fill } from "@/lib/i18n";
import { DURATION_OPTIONS } from "@/lib/journey/generator";
import type { Lang } from "@/lib/content/types";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-gold-400" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full bg-paper p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            value === o.id ? "bg-cream text-ink shadow-soft" : "text-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <span className="text-[15px] text-ink">{label}</span>
      {children}
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wide text-faint">
      {children}
    </p>
  );
}

export default function SettingsPage() {
  const s = useSettings();
  const { t } = s;
  const [email, setEmail] = useState("");
  const [authMsg, setAuthMsg] = useState<string | null>(null);
  const [open, setOpen] = useState<"about" | "privacy" | null>(null);

  const submitSignIn = async () => {
    if (!email.trim()) return;
    const res = await s.signIn(email.trim());
    setAuthMsg(res.message);
  };

  return (
    <>
      <Screen withNav>
        <PageHeader title={t.settings.title} />

        {/* Account */}
        <GroupLabel>{t.settings.account}</GroupLabel>
        <Card className="divide-y divide-line/60">
          {s.userEmail ? (
            <>
              <div className="px-4 py-3.5 text-[15px] text-ink">
                {fill(t.settings.signedInAs, { email: s.userEmail })}
              </div>
              <div className="px-4 py-3.5">
                <Button variant="outline" onClick={s.signOut}>
                  {t.settings.signOut}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3 px-4 py-4">
              <p className="text-[15px] text-ink">{t.settings.guest}</p>
              <p className="text-sm text-muted">{t.settings.guestNote}</p>
              {s.supabaseEnabled && (
                <div className="space-y-2 pt-1">
                  <input
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-line bg-cream px-4 py-2.5 text-[15px] text-ink"
                  />
                  <Button variant="soft" onClick={submitSignIn}>
                    {t.settings.signIn}
                  </Button>
                  {authMsg && <p className="text-sm text-muted">{authMsg}</p>}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Preferences */}
        <GroupLabel>{t.settings.preferences}</GroupLabel>
        <Card className="divide-y divide-line/60">
          <Row label={t.settings.language}>
            <Segmented<Lang>
              value={s.lang}
              onChange={s.setLang}
              options={[
                { id: "en", label: "EN" },
                { id: "id", label: "ID" },
              ]}
            />
          </Row>
          <Row label={t.settings.musicLanguage}>
            <Segmented<MusicLangPref>
              value={s.musicLang}
              onChange={s.setMusicLang}
              options={[
                { id: "same", label: t.settings.musicOptions.same },
                { id: "en", label: t.settings.musicOptions.en },
                { id: "id", label: t.settings.musicOptions.id },
              ]}
            />
          </Row>
          <div className="px-4 py-3.5">
            <p className="mb-2.5 text-[15px] text-ink">{t.settings.defaultDuration}</p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => s.setDefaultDuration(d)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    s.defaultDuration === d
                      ? "bg-gold-400 text-ink"
                      : "bg-paper text-muted hover:text-ink"
                  }`}
                >
                  {d} {t.common.minuteShort}
                </button>
              ))}
            </div>
          </div>
          <Row label={t.settings.backgroundMusic}>
            <Toggle
              checked={s.backgroundMusic}
              onChange={s.setBackgroundMusic}
              label={t.settings.backgroundMusic}
            />
          </Row>
          <div className="flex items-center justify-between gap-4 px-4 py-3.5">
            <div>
              <p className="text-[15px] text-ink">{t.settings.reminders}</p>
              <p className="mt-0.5 text-sm text-muted">{t.settings.reminderNote}</p>
            </div>
            <Toggle
              checked={s.reminder}
              onChange={s.setReminder}
              label={t.settings.reminders}
            />
          </div>
        </Card>

        {/* About & Privacy */}
        <GroupLabel>{t.settings.about}</GroupLabel>
        <Card className="divide-y divide-line/60">
          <button
            type="button"
            onClick={() => setOpen(open === "about" ? null : "about")}
            className="flex w-full items-center justify-between px-4 py-3.5 text-left"
            aria-expanded={open === "about"}
          >
            <span className="text-[15px] text-ink">{t.settings.aboutTitle}</span>
            <ChevronDown
              size={18}
              className={`text-faint transition-transform ${open === "about" ? "rotate-180" : ""}`}
            />
          </button>
          {open === "about" && (
            <p className="px-4 py-4 text-sm leading-relaxed text-muted">
              {t.settings.aboutText}
            </p>
          )}
          <button
            type="button"
            onClick={() => setOpen(open === "privacy" ? null : "privacy")}
            className="flex w-full items-center justify-between px-4 py-3.5 text-left"
            aria-expanded={open === "privacy"}
          >
            <span className="text-[15px] text-ink">{t.settings.privacyTitle}</span>
            <ChevronDown
              size={18}
              className={`text-faint transition-transform ${open === "privacy" ? "rotate-180" : ""}`}
            />
          </button>
          {open === "privacy" && (
            <p className="px-4 py-4 text-sm leading-relaxed text-muted">
              {t.settings.privacyText}
            </p>
          )}
        </Card>

        <p className="mt-8 text-center text-xs text-faint">{t.appName}</p>
      </Screen>
      <BottomNav />
    </>
  );
}
