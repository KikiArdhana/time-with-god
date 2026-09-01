import { getSupabase } from "@/lib/supabase/client";
import type { ThemeId } from "@/lib/content/types";
import type { EntryType } from "@/lib/journey/sections";
import {
  readSessions as localRead,
  upsertSession as localUpsert,
  getSession as localGet,
} from "./local";
import type { StoredEntry, StoredSession } from "./types";

// The app is local-first: everything is saved to the device immediately. When
// Supabase is configured AND the user is signed in, reads/writes also use Supabase
// so sessions and journal entries follow the account across devices. Every remote
// call is best-effort and falls back to local storage on any error.

async function currentUserId(): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data } = await sb.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function rowToSession(row: any, entryRows: any[]): StoredSession {
  return {
    id: row.id,
    date: row.date,
    durationMinutes: row.duration_minutes,
    intentions: (row.intentions ?? [row.intention]) as ThemeId[],
    primaryIntention: row.intention as ThemeId,
    scriptureId: row.scripture_id,
    steps: row.steps ?? [],
    startedAt: row.started_at,
    completedAt: row.completed_at ?? null,
    note: row.note ?? "",
    entries: entryRows
      .map((e) => ({
        id: e.id,
        type: e.type as EntryType,
        section: e.section ?? "",
        content: e.content ?? "",
        createdAt: e.created_at,
      }))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  };
}

function sessionToRow(s: StoredSession, userId: string) {
  return {
    id: s.id,
    user_id: userId,
    date: s.date,
    duration_minutes: s.durationMinutes,
    intention: s.primaryIntention,
    intentions: s.intentions,
    scripture_id: s.scriptureId,
    steps: s.steps,
    started_at: s.startedAt,
    completed_at: s.completedAt,
    note: s.note,
  };
}

function entryToRow(e: StoredEntry, sessionId: string, userId: string) {
  return {
    id: e.id,
    user_id: userId,
    session_id: sessionId,
    type: e.type,
    section: e.section,
    content: e.content,
    created_at: e.createdAt,
  };
}

export async function loadSessions(): Promise<StoredSession[]> {
  const sb = getSupabase();
  const uid = await currentUserId();
  if (sb && uid) {
    try {
      const { data: sessions, error } = await sb
        .from("sessions")
        .select("*")
        .eq("user_id", uid)
        .order("started_at", { ascending: false });
      if (error) throw error;
      const { data: entries } = await sb
        .from("journal_entries")
        .select("*")
        .eq("user_id", uid);
      const grouped = new Map<string, any[]>();
      (entries ?? []).forEach((e) => {
        const list = grouped.get(e.session_id) ?? [];
        list.push(e);
        grouped.set(e.session_id, list);
      });
      return (sessions ?? []).map((row) => rowToSession(row, grouped.get(row.id) ?? []));
    } catch {
      return localRead();
    }
  }
  return localRead();
}

export async function saveSession(session: StoredSession): Promise<void> {
  localUpsert(session);
  const sb = getSupabase();
  const uid = await currentUserId();
  if (!sb || !uid) return;
  try {
    await sb.from("sessions").upsert(sessionToRow(session, uid));
    if (session.entries.length > 0) {
      await sb
        .from("journal_entries")
        .upsert(session.entries.map((e) => entryToRow(e, session.id, uid)));
    }
  } catch {
    // best-effort; local copy is already saved
  }
}

export function getLocalSession(id: string): StoredSession | undefined {
  return localGet(id);
}
