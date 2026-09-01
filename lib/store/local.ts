import type { StoredSession } from "./types";

const SESSIONS_KEY = "twg.sessions.v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readSessions(): StoredSession[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredSession[]) : [];
  } catch {
    return [];
  }
}

function writeSessions(sessions: StoredSession[]): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch {
    // Storage may be full or unavailable (private mode). Fail quietly.
  }
}

export function upsertSession(session: StoredSession): void {
  const sessions = readSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) sessions[idx] = session;
  else sessions.unshift(session);
  writeSessions(sessions);
}

export function getSession(id: string): StoredSession | undefined {
  return readSessions().find((s) => s.id === id);
}
