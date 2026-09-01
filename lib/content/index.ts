import type { Lang, Prompt, Scripture, ThemeId } from "./types";
import { themeById } from "./themes";
import { scriptureById, scriptures } from "./scriptures";
import { reflectionPrompts } from "./reflections";
import { prayerPrompts } from "./prayerPrompts";
import { gratitudePrompts } from "./gratitudePrompts";
import { worshipByLang, type WorshipTrack } from "./worship";

export * from "./types";
export { themes, themeById } from "./themes";
export { scriptures, scriptureById } from "./scriptures";
export { worshipByLang } from "./worship";

// A tiny deterministic string hash (FNV-1a style). Same input -> same number,
// so a given day + intention yields a stable selection that still varies daily.
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// YYYY-MM-DD in local time, used as the daily seed.
export function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function pickFrom<T>(items: T[], seed: string): T {
  return items[hash(seed) % items.length];
}

function pickN<T extends { id: string }>(items: T[], seed: string, n: number): T[] {
  if (items.length <= n) return items;
  // Deterministic shuffle by scoring each item with a per-item seed.
  const scored = items
    .map((item) => ({ item, score: hash(seed + item.id) }))
    .sort((a, b) => a.score - b.score);
  return scored.slice(0, n).map((s) => s.item);
}

function promptsForTheme(pool: Prompt[], theme: ThemeId): Prompt[] {
  const matched = pool.filter((p) => p.themes.includes(theme));
  return matched.length > 0 ? matched : pool;
}

/** Choose the Scripture for a session: stable per day + primary intention. */
export function selectScripture(theme: ThemeId, seedDate = new Date()): Scripture {
  const t = themeById(theme);
  const candidates = t.scriptureIds
    .map((id) => scriptureById(id))
    .filter((s): s is Scripture => Boolean(s));
  const pool = candidates.length > 0 ? candidates : scriptures;
  return pickFrom(pool, `${dayKey(seedDate)}:${theme}:scripture`);
}

export function selectReflectionPrompts(theme: ThemeId, count = 3, seedDate = new Date()): Prompt[] {
  return pickN(promptsForTheme(reflectionPrompts, theme), `${dayKey(seedDate)}:${theme}:reflect`, count);
}

export function selectPrayerPrompts(theme: ThemeId, count = 5, seedDate = new Date()): Prompt[] {
  return pickN(promptsForTheme(prayerPrompts, theme), `${dayKey(seedDate)}:${theme}:prayer`, count);
}

export function selectGratitudePrompts(theme: ThemeId, count = 4, seedDate = new Date()): Prompt[] {
  return pickN(promptsForTheme(gratitudePrompts, theme), `${dayKey(seedDate)}:${theme}:gratitude`, count);
}

export function selectWorship(lang: Lang, seedDate = new Date()): WorshipTrack {
  const pool = worshipByLang(lang);
  return pickFrom(pool, `${dayKey(seedDate)}:${lang}:worship`);
}

// Build the external "read full chapter" link. The app hosts only public-domain
// text; for full chapters and other translations it links to Bible Gateway.
export function fullChapterUrl(scripture: Scripture, lang: Lang): string {
  const version = lang === "id" ? "TB" : "WEB";
  const passage = encodeURIComponent(`${scripture.book} ${scripture.chapter}`);
  return `https://www.biblegateway.com/passage/?search=${passage}&version=${version}`;
}
