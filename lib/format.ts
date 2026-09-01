import type { Lang, ThemeId } from "@/lib/content/types";
import { localeTag } from "@/lib/i18n";
import { themeById } from "@/lib/content/themes";

export function formatDay(dateStr: string, lang: Lang): string {
  // dateStr is YYYY-MM-DD (local). Build a local Date at noon to avoid TZ drift.
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1, 12);
  return new Intl.DateTimeFormat(localeTag(lang), {
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatFullDate(iso: string, lang: Lang): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(localeTag(lang), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(iso: string, lang: Lang): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(localeTag(lang), {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function intentionLabel(id: ThemeId, lang: Lang): string {
  return themeById(id).label[lang];
}

export function intentionsLabel(ids: ThemeId[], lang: Lang): string {
  return ids.map((id) => intentionLabel(id, lang)).join(" \u00b7 ");
}
