import type { SectionId, ThemeId } from "@/lib/content/types";

export interface JourneyStep {
  id: SectionId;
  minutes: number;
}

export const DURATION_OPTIONS = [10, 15, 20, 30, 45, 60] as const;

// Minimum minutes a section can be trimmed to during customization.
export const SECTION_MIN_MINUTES = 1;

// Base templates per duration. Each sums exactly to its total. These are ONE
// possible shape for the time available — the user can always customize or skip.
const TEMPLATES: Record<number, JourneyStep[]> = {
  10: [
    { id: "be-still", minutes: 2 },
    { id: "scripture", minutes: 5 },
    { id: "prayer", minutes: 3 },
  ],
  15: [
    { id: "be-still", minutes: 2 },
    { id: "scripture", minutes: 6 },
    { id: "reflection", minutes: 3 },
    { id: "prayer", minutes: 4 },
  ],
  20: [
    { id: "be-still", minutes: 3 },
    { id: "scripture", minutes: 7 },
    { id: "reflection", minutes: 5 },
    { id: "prayer", minutes: 5 },
  ],
  30: [
    { id: "be-still", minutes: 3 },
    { id: "scripture", minutes: 7 },
    { id: "worship", minutes: 7 },
    { id: "gratitude", minutes: 6 },
    { id: "prayer", minutes: 5 },
    { id: "closing", minutes: 2 },
  ],
  45: [
    { id: "be-still", minutes: 4 },
    { id: "scripture", minutes: 8 },
    { id: "worship", minutes: 7 },
    { id: "reflection", minutes: 7 },
    { id: "gratitude", minutes: 7 },
    { id: "prayer", minutes: 8 },
    { id: "closing", minutes: 4 },
  ],
  60: [
    { id: "be-still", minutes: 5 },
    { id: "scripture", minutes: 10 },
    { id: "worship", minutes: 9 },
    { id: "reflection", minutes: 9 },
    { id: "gratitude", minutes: 9 },
    { id: "prayer", minutes: 13 },
    { id: "closing", minutes: 5 },
  ],
};

// Which section each intention leans toward. A single gentle +1/-1 nudge keeps the
// total unchanged while letting the journey reflect what the person brought.
const INTENTION_EMPHASIS: Partial<Record<ThemeId, { boost: SectionId; from: SectionId }>> = {
  praise: { boost: "worship", from: "prayer" },
  peace: { boost: "be-still", from: "prayer" },
  intercession: { boost: "prayer", from: "scripture" },
  guidance: { boost: "reflection", from: "worship" },
  reflect: { boost: "reflection", from: "worship" },
  "with-god": { boost: "be-still", from: "reflection" },
};

export function snapToDuration(minutes: number): number {
  return DURATION_OPTIONS.reduce((best, d) =>
    Math.abs(d - minutes) < Math.abs(best - minutes) ? d : best,
  DURATION_OPTIONS[0]);
}

function applyEmphasis(steps: JourneyStep[], theme: ThemeId): JourneyStep[] {
  const rule = INTENTION_EMPHASIS[theme];
  if (!rule) return steps;
  const boost = steps.find((s) => s.id === rule.boost);
  const from = steps.find((s) => s.id === rule.from);
  if (!boost || !from || from.minutes <= SECTION_MIN_MINUTES + 1) return steps;
  return steps.map((s) => {
    if (s.id === rule.boost) return { ...s, minutes: s.minutes + 1 };
    if (s.id === rule.from) return { ...s, minutes: s.minutes - 1 };
    return s;
  });
}

/**
 * Build one suggested journey for the given time and primary intention.
 * Deterministic: same inputs always produce the same shape.
 */
export function generateJourney(minutes: number, theme: ThemeId): JourneyStep[] {
  const total = snapToDuration(minutes);
  const base = TEMPLATES[total].map((s) => ({ ...s }));
  return applyEmphasis(base, theme);
}

export function totalMinutes(steps: JourneyStep[]): number {
  return steps.reduce((sum, s) => sum + s.minutes, 0);
}
