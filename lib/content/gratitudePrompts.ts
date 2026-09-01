import type { Prompt } from "./types";

// Gentle invitations for gratitude. Optional and open-ended.
export const gratitudePrompts: Prompt[] = [
  {
    id: "g-life",
    themes: ["praise", "peace", "reflect", "with-god", "unsure", "guidance", "intercession"],
    text: { en: "Something in your life", id: "Sesuatu dalam hidupmu" },
  },
  {
    id: "g-person",
    themes: ["praise", "intercession", "with-god", "unsure", "reflect", "peace", "guidance"],
    text: { en: "Someone you're thankful for", id: "Seseorang yang kamu syukuri" },
  },
  {
    id: "g-goodness",
    themes: ["praise", "reflect", "with-god", "peace"],
    text: {
      en: "A way you've experienced God's goodness",
      id: "Cara kamu mengalami kebaikan Tuhan",
    },
  },
  {
    id: "g-provided",
    themes: ["praise", "guidance", "intercession", "peace"],
    text: {
      en: "Something He has provided",
      id: "Sesuatu yang telah Ia sediakan",
    },
  },
  {
    id: "g-beauty",
    themes: ["praise", "reflect", "with-god", "unsure"],
    text: {
      en: "Something beautiful you've received",
      id: "Sesuatu yang indah yang kamu terima",
    },
  },
];
