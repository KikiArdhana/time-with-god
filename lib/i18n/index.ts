import type { Lang } from "@/lib/content/types";
import en, { type Dict } from "./en";
import id from "./id";

export type { Dict };

export const dictionaries: Record<Lang, Dict> = { en, id };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang] ?? en;
}

/** Replace {token} placeholders, e.g. fill(t.suggest.timeLine, { n: 30 }). */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export function localeTag(lang: Lang): string {
  return lang === "id" ? "id-ID" : "en-US";
}
