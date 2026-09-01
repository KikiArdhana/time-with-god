import type { SectionId } from "@/lib/content/types";

// What a section may collect from the user, stored as a journal entry of this type.
export type EntryType = "note" | "reflection" | "gratitude" | "prayer";

export interface SectionMeta {
  id: SectionId;
  // Background worship plays only during worship. Elsewhere it stays quiet so the
  // user can hear their own thoughts (Scripture, prayer, silence).
  music: boolean;
  // The journal entry type this section can save. Undefined = collects nothing.
  input?: EntryType;
}

export const SECTION_META: Record<SectionId, SectionMeta> = {
  "be-still": { id: "be-still", music: false },
  scripture: { id: "scripture", music: false, input: "note" },
  worship: { id: "worship", music: true },
  reflection: { id: "reflection", music: false, input: "reflection" },
  gratitude: { id: "gratitude", music: false, input: "gratitude" },
  prayer: { id: "prayer", music: false, input: "prayer" },
  closing: { id: "closing", music: false },
};
