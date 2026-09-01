import type { Lang } from "./types";

// The closing blessing is Numbers 6:24-26 (World English Bible, public domain),
// shown as Scripture. Book name is localized; the reference itself is universal.
export function fmtBlessingRef(lang: Lang): string {
  return lang === "id" ? "Bilangan 6:24-26" : "Numbers 6:24-26";
}
