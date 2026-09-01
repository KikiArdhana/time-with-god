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
import type { ThemeId } from "@/lib/content/types";
import type { EntryType } from "@/lib/journey/sections";
import { generateJourney, type JourneyStep } from "@/lib/journey/generator";
import { dayKey, selectScripture } from "@/lib/content";
import { getLocalSession, loadSessions, saveSession } from "./repo";
import type { StoredEntry, StoredSession } from "./types";

export interface ActivePlan {
  id: string;
  date: string;
  durationMinutes: number;
  intentions: ThemeId[];
  primaryIntention: ThemeId;
  scriptureId: string;
  steps: JourneyStep[];
  startedAt: string;
  note: string;
  // One entry per section, keyed by section id.
  entries: Record<string, StoredEntry>;
}

const ACTIVE_KEY = "twg.active.v1";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface SessionValue {
  ready: boolean;
  active: ActivePlan | null;
  sessions: StoredSession[];
  createPlan: (input: { durationMinutes: number; intentions: ThemeId[] }) => ActivePlan;
  setSteps: (steps: JourneyStep[]) => void;
  setEntry: (section: string, type: EntryType, content: string) => void;
  getEntry: (section: string) => string;
  setNote: (content: string) => void;
  completePlan: () => string | null;
  clearActive: () => void;
  getStoredSession: (id: string) => StoredSession | undefined;
  updateSessionNote: (id: string, note: string) => void;
  refresh: () => void;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActivePlan | null>(null);
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [ready, setReady] = useState(false);

  // Restore any in-progress plan and load saved sessions on mount.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(ACTIVE_KEY);
      if (raw) setActive(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistActive = useCallback((plan: ActivePlan | null) => {
    setActive(plan);
    try {
      if (plan) window.sessionStorage.setItem(ACTIVE_KEY, JSON.stringify(plan));
      else window.sessionStorage.removeItem(ACTIVE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const refresh = useCallback(async () => {
    const list = await loadSessions();
    setSessions(list);
  }, []);

  const createPlan = useCallback<SessionValue["createPlan"]>(
    ({ durationMinutes, intentions }) => {
      const primary = intentions[0] ?? "unsure";
      const steps = generateJourney(durationMinutes, primary);
      const scripture = selectScripture(primary);
      const plan: ActivePlan = {
        id: newId(),
        date: dayKey(),
        durationMinutes,
        intentions,
        primaryIntention: primary,
        scriptureId: scripture.id,
        steps,
        startedAt: new Date().toISOString(),
        note: "",
        entries: {},
      };
      persistActive(plan);
      return plan;
    },
    [persistActive],
  );

  const setSteps = useCallback(
    (steps: JourneyStep[]) => {
      setActive((prev) => {
        if (!prev) return prev;
        const next = { ...prev, steps };
        try {
          window.sessionStorage.setItem(ACTIVE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const setEntry = useCallback((section: string, type: EntryType, content: string) => {
    setActive((prev) => {
      if (!prev) return prev;
      const entries = { ...prev.entries };
      entries[section] = {
        id: entries[section]?.id ?? newId(),
        type,
        section,
        content,
        createdAt: entries[section]?.createdAt ?? new Date().toISOString(),
      };
      const next = { ...prev, entries };
      try {
        window.sessionStorage.setItem(ACTIVE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const getEntry = useCallback(
    (section: string) => active?.entries[section]?.content ?? "",
    [active],
  );

  const setNote = useCallback((content: string) => {
    setActive((prev) => (prev ? { ...prev, note: content } : prev));
  }, []);

  const completePlan = useCallback<SessionValue["completePlan"]>(() => {
    if (!active) return null;
    const entries = Object.values(active.entries).filter((e) => e.content.trim().length > 0);
    const session: StoredSession = {
      id: active.id,
      date: active.date,
      durationMinutes: active.durationMinutes,
      intentions: active.intentions,
      primaryIntention: active.primaryIntention,
      scriptureId: active.scriptureId,
      steps: active.steps,
      startedAt: active.startedAt,
      completedAt: new Date().toISOString(),
      note: active.note,
      entries,
    };
    void saveSession(session).then(() => void refresh());
    // Reflect immediately in local state too.
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== session.id);
      return [session, ...filtered];
    });
    persistActive(null);
    return session.id;
  }, [active, persistActive, refresh]);

  const clearActive = useCallback(() => persistActive(null), [persistActive]);

  const getStoredSession = useCallback(
    (id: string) => sessions.find((s) => s.id === id) ?? getLocalSession(id),
    [sessions],
  );

  const updateSessionNote = useCallback(
    (id: string, note: string) => {
      const existing = sessions.find((s) => s.id === id) ?? getLocalSession(id);
      if (!existing) return;
      const updated = { ...existing, note };
      void saveSession(updated).then(() => void refresh());
      setSessions((prev) => prev.map((s) => (s.id === id ? updated : s)));
    },
    [sessions, refresh],
  );

  const value = useMemo<SessionValue>(
    () => ({
      ready,
      active,
      sessions,
      createPlan,
      setSteps,
      setEntry,
      getEntry,
      setNote,
      completePlan,
      clearActive,
      getStoredSession,
      updateSessionNote,
      refresh: () => void refresh(),
    }),
    [
      ready,
      active,
      sessions,
      createPlan,
      setSteps,
      setEntry,
      getEntry,
      setNote,
      completePlan,
      clearActive,
      getStoredSession,
      updateSessionNote,
      refresh,
    ],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
