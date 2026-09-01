import type { ThemeId } from "@/lib/content/types";
import type { EntryType } from "@/lib/journey/sections";
import type { JourneyStep } from "@/lib/journey/generator";

export interface StoredEntry {
  id: string;
  type: EntryType;
  // Which section produced it (e.g. "scripture", "prayer").
  section: string;
  content: string;
  createdAt: string; // ISO
}

export interface StoredSession {
  id: string;
  date: string; // YYYY-MM-DD (local day the session began)
  durationMinutes: number;
  intentions: ThemeId[];
  primaryIntention: ThemeId;
  scriptureId: string;
  steps: JourneyStep[];
  startedAt: string; // ISO
  completedAt: string | null; // ISO once finished
  note: string; // the user's "note for today"
  entries: StoredEntry[];
}
