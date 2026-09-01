import type { Theme, ThemeId } from "./types";

// The intentions a person can bring. "unsure" ("I don't know") is intentionally
// first-class: we never force anyone to name an emotional state.
export const themes: Theme[] = [
  {
    id: "praise",
    label: { en: "Praise & gratitude", id: "Pujian & syukur" },
    description: {
      en: "Come with a thankful heart.",
      id: "Datang dengan hati yang bersyukur.",
    },
    scriptureIds: ["ps100", "ps103", "th5", "ps63"],
  },
  {
    id: "peace",
    label: { en: "Seeking peace & rest", id: "Mencari damai & istirahat" },
    description: {
      en: "Lay down what feels heavy.",
      id: "Letakkan beban yang terasa berat.",
    },
    scriptureIds: ["ps46", "php4", "mt11", "ps23"],
  },
  {
    id: "intercession",
    label: { en: "Prayer & intercession", id: "Doa & syafaat" },
    description: {
      en: "Bring others and yourself before God.",
      id: "Bawa orang lain dan dirimu ke hadapan Tuhan.",
    },
    scriptureIds: ["php4", "th5", "ps121"],
  },
  {
    id: "guidance",
    label: { en: "Needing guidance", id: "Membutuhkan tuntunan" },
    description: {
      en: "Ask, and wait, and listen.",
      id: "Bertanya, menanti, dan mendengarkan.",
    },
    scriptureIds: ["pr3", "ps121", "is40", "jn15"],
  },
  {
    id: "reflect",
    label: { en: "Reflect & grow", id: "Merenung & bertumbuh" },
    description: {
      en: "Sit with Scripture and let it settle.",
      id: "Diam bersama Firman dan biarkan meresap.",
    },
    scriptureIds: ["ps139", "lam3", "jn15", "ps23"],
  },
  {
    id: "with-god",
    label: { en: "I just want to be with Him", id: "Aku hanya ingin bersama-Nya" },
    description: {
      en: "No agenda. Just presence.",
      id: "Tanpa agenda. Hanya hadir.",
    },
    scriptureIds: ["ps63", "jn15", "ps139", "ps23"],
  },
  {
    id: "unsure",
    label: { en: "I don't know", id: "Aku tidak tahu" },
    description: {
      en: "That's alright. You can still begin.",
      id: "Tidak apa-apa. Kamu tetap bisa mulai.",
    },
    scriptureIds: ["ps23", "mt11", "lam3", "ps46"],
  },
];

export const themeById = (id: ThemeId): Theme =>
  themes.find((t) => t.id === id) ?? themes[themes.length - 1];
