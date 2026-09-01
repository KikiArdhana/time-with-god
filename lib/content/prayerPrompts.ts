import type { Prompt } from "./types";

// Prayer prompts are gentle GUIDELINES. The app never writes a prayer for the user
// and never infers their spiritual or emotional condition. The user prays in their
// own words; these are only optional things they may wish to bring before God.
export const prayerPrompts: Prompt[] = [
  {
    id: "p-thankful-thing",
    themes: ["praise", "peace", "reflect", "with-god", "unsure", "guidance", "intercession"],
    text: {
      en: "Something you're thankful for",
      id: "Sesuatu yang kamu syukuri",
    },
  },
  {
    id: "p-thankful-person",
    themes: ["praise", "intercession", "with-god", "unsure", "reflect", "peace", "guidance"],
    text: {
      en: "Someone you're thankful for",
      id: "Seseorang yang kamu syukuri",
    },
  },
  {
    id: "p-god-done",
    themes: ["praise", "reflect", "with-god", "peace"],
    text: {
      en: "Something God has done in your life",
      id: "Sesuatu yang telah Tuhan lakukan dalam hidupmu",
    },
  },
  {
    id: "p-surrender",
    themes: ["peace", "guidance", "unsure", "reflect"],
    text: {
      en: "Something you'd like to surrender",
      id: "Sesuatu yang ingin kamu serahkan",
    },
  },
  {
    id: "p-pray-for",
    themes: ["intercession", "peace", "unsure", "with-god"],
    text: {
      en: "Someone you'd like to pray for",
      id: "Seseorang yang ingin kamu doakan",
    },
  },
  {
    id: "p-ask",
    themes: ["guidance", "intercession", "peace", "unsure"],
    text: {
      en: "Something you'd like to ask God for",
      id: "Sesuatu yang ingin kamu mintakan kepada Tuhan",
    },
  },
  {
    id: "p-guidance",
    themes: ["guidance"],
    text: {
      en: "A decision you're seeking guidance on",
      id: "Keputusan yang sedang kamu carikan tuntunan",
    },
  },
];
