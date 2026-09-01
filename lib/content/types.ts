// Shared content types for the curated, bilingual content library.
// All theologically meaningful content is curated here (never generated at runtime).

export type Lang = "en" | "id";

export type ThemeId =
  | "praise"
  | "peace"
  | "intercession"
  | "guidance"
  | "reflect"
  | "with-god"
  | "unsure";

export type SectionId =
  | "be-still"
  | "scripture"
  | "worship"
  | "reflection"
  | "gratitude"
  | "prayer"
  | "closing";

export interface Localized {
  en: string;
  id: string;
}

export interface Theme {
  id: ThemeId;
  label: Localized;
  description: Localized;
  scriptureIds: string[];
}

export interface Verse {
  v: number;
  t: string;
}

export interface Scripture {
  id: string;
  themes: ThemeId[];
  // Public reference, e.g. "Psalm 100:1-5" — book names localized, numbers are universal.
  reference: Localized;
  // Book + chapter used to build an external "read full chapter" link.
  book: string; // English book name for URL building
  chapter: number;
  // Translation label shown to the user. English text ships as the public-domain
  // World English Bible so it is licensing-safe to host.
  translation: Localized;
  // Verse text. English = World English Bible (public domain).
  // Indonesian text is intentionally null so we never display an unofficial/modified
  // translation; the UI falls back gracefully and links out for other translations.
  verses: {
    en: Verse[];
    id: Verse[] | null;
  };
}

export interface Prompt {
  id: string;
  themes: ThemeId[];
  text: Localized;
}
