import type { Lang } from "./types";

export interface WorshipTrack {
  id: string;
  lang: Lang;
  title: string;
  artist: string;
  // Files live in /public/audio/worship/<lang>/. Only host audio you have the
  // right to use. The tracks shipped here are original, royalty-free ambient pads
  // meant as gentle placeholders — replace them with licensed worship music.
  src: string;
}

export const worshipTracks: WorshipTrack[] = [
  {
    id: "en-still-waters",
    lang: "en",
    title: "Still Waters",
    artist: "Ambient \u00b7 Time With God",
    src: "/audio/worship/en/still-waters.mp3",
  },
  {
    id: "en-morning-light",
    lang: "en",
    title: "Morning Light",
    artist: "Ambient \u00b7 Time With God",
    src: "/audio/worship/en/morning-light.mp3",
  },
  {
    id: "id-air-tenang",
    lang: "id",
    title: "Air yang Tenang",
    artist: "Ambient \u00b7 Time With God",
    src: "/audio/worship/id/air-yang-tenang.mp3",
  },
  {
    id: "id-cahaya-pagi",
    lang: "id",
    title: "Cahaya Pagi",
    artist: "Ambient \u00b7 Time With God",
    src: "/audio/worship/id/cahaya-pagi.mp3",
  },
];

export const worshipByLang = (lang: Lang): WorshipTrack[] => {
  const list = worshipTracks.filter((t) => t.lang === lang);
  return list.length > 0 ? list : worshipTracks;
};
