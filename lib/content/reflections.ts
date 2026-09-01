import type { Prompt } from "./types";

// Reflection prompts are open questions for personal reflection.
// They never claim to speak for God or interpret Scripture with divine authority.
export const reflectionPrompts: Prompt[] = [
  {
    id: "r-god",
    themes: ["praise", "peace", "guidance", "reflect", "with-god", "unsure", "intercession"],
    text: {
      en: "What does this passage reveal about God?",
      id: "Apa yang dinyatakan bagian ini tentang Tuhan?",
    },
  },
  {
    id: "r-stands",
    themes: ["praise", "peace", "guidance", "reflect", "with-god", "unsure", "intercession"],
    text: {
      en: "What stands out to you today?",
      id: "Apa yang menonjol bagimu hari ini?",
    },
  },
  {
    id: "r-carry",
    themes: ["praise", "peace", "guidance", "reflect", "with-god", "unsure", "intercession"],
    text: {
      en: "Is there something you'd like to carry with you?",
      id: "Adakah sesuatu yang ingin kamu bawa serta?",
    },
  },
  {
    id: "r-respond",
    themes: ["reflect", "guidance", "peace"],
    text: {
      en: "Is there something you feel invited to respond to?",
      id: "Adakah sesuatu yang membuatmu terdorong untuk menanggapi?",
    },
  },
  {
    id: "r-honest",
    themes: ["unsure", "peace", "with-god"],
    text: {
      en: "If you're honest with yourself, how are you really doing?",
      id: "Kalau jujur pada diri sendiri, bagaimana keadaanmu sebenarnya?",
    },
  },
  {
    id: "r-quiet",
    themes: ["with-god", "reflect", "peace"],
    text: {
      en: "What might it look like to simply rest in God's presence right now?",
      id: "Seperti apa rasanya sekadar berdiam di hadirat Tuhan saat ini?",
    },
  },
];
