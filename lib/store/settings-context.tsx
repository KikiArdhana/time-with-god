"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/content/types";
import { getDict, type Dict } from "@/lib/i18n";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

export type MusicLangPref = "same" | Lang;

interface Preferences {
  lang: Lang;
  musicLang: MusicLangPref;
  defaultDuration: number;
  backgroundMusic: boolean;
  reminder: boolean;
}

const DEFAULTS: Preferences = {
  lang: "en",
  musicLang: "same",
  defaultDuration: 30,
  backgroundMusic: true,
  reminder: false,
};

const PREFS_KEY = "twg.settings.v1";

interface SettingsValue extends Preferences {
  t: Dict;
  effectiveMusicLang: Lang;
  hydrated: boolean;
  setLang: (l: Lang) => void;
  setMusicLang: (m: MusicLangPref) => void;
  setDefaultDuration: (n: number) => void;
  setBackgroundMusic: (b: boolean) => void;
  setReminder: (b: boolean) => void;
  // Auth (optional; only meaningful when Supabase is configured)
  supabaseEnabled: boolean;
  userEmail: string | null;
  signIn: (email: string) => Promise<{ ok: boolean; message: string }>;
  signOut: () => Promise<void>;
}

const SettingsContext = createContext<SettingsValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Load stored preferences after mount (keeps SSR output deterministic).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PREFS_KEY);
      if (raw) setPrefs({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist and reflect language on <html>.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
    document.documentElement.lang = prefs.lang;
  }, [prefs, hydrated]);

  // Track Supabase auth session if configured.
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let active = true;
    sb.auth.getUser().then(({ data }) => {
      if (active) setUserEmail(data.user?.email ?? null);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const update = useCallback((patch: Partial<Preferences>) => {
    setPrefs((p) => ({ ...p, ...patch }));
  }, []);

  const signIn = useCallback(async (email: string) => {
    const sb = getSupabase();
    if (!sb) return { ok: false, message: "Sign-in is not configured." };
    try {
      const redirectTo =
        typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) return { ok: false, message: error.message };
      return { ok: true, message: "Check your email for a sign-in link." };
    } catch {
      return { ok: false, message: "Something went wrong. Please try again." };
    }
  }, []);

  const signOut = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    try {
      await sb.auth.signOut();
    } catch {
      /* ignore */
    }
    setUserEmail(null);
  }, []);

  const value = useMemo<SettingsValue>(() => {
    const effectiveMusicLang: Lang =
      prefs.musicLang === "same" ? prefs.lang : prefs.musicLang;
    return {
      ...prefs,
      t: getDict(prefs.lang),
      effectiveMusicLang,
      hydrated,
      setLang: (l) => update({ lang: l }),
      setMusicLang: (m) => update({ musicLang: m }),
      setDefaultDuration: (n) => update({ defaultDuration: n }),
      setBackgroundMusic: (b) => update({ backgroundMusic: b }),
      setReminder: (b) => update({ reminder: b }),
      supabaseEnabled: isSupabaseConfigured(),
      userEmail,
      signIn,
      signOut,
    };
  }, [prefs, hydrated, userEmail, update, signIn, signOut]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
