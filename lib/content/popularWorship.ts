import type { Lang } from "./types";

// A small, curated catalog of well-known worship songs, streamed via YouTube's
// official embed player (playing directly from the copyright holder's own
// channel) rather than hosted here — we never download or redistribute
// copyrighted audio. If a video's owner has disabled embedding, the player
// degrades gracefully and offers a link to watch on YouTube instead.
export interface PopularSong {
  id: string;
  lang: Lang;
  title: string;
  artist: string;
  youtubeId: string;
}

export const popularWorshipSongs: PopularSong[] = [
  {
    id: "en-beautiful-name",
    lang: "en",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    youtubeId: "r5L6QlAH3L4",
  },
  {
    id: "en-10000-reasons",
    lang: "en",
    title: "10,000 Reasons (Bless the Lord)",
    artist: "Matt Redman",
    youtubeId: "XtwIT8JjddM",
  },
  {
    id: "en-way-maker",
    lang: "en",
    title: "Way Maker",
    artist: "Sinach",
    youtubeId: "QM8jQHE5AAk",
  },
  {
    id: "en-oceans",
    lang: "en",
    title: "Oceans (Where Feet May Fail)",
    artist: "Hillsong UNITED",
    youtubeId: "QI-Z0lq-LIE",
  },
  {
    id: "id-sepenuh-hati",
    lang: "id",
    title: "Sepenuh Hati",
    artist: "Rony Parulian & Andi Rianto",
    youtubeId: "vVdi82IkFcA",
  },
  {
    id: "id-kaulah-segalanya",
    lang: "id",
    title: "Kaulah Segalanya",
    artist: "JPCC Worship",
    youtubeId: "gMsYaCIbD0U",
  },
  {
    id: "id-bapa-sungguh-baik",
    lang: "id",
    title: "Bapa Engkau Sungguh Baik",
    artist: "Putri Siagian",
    youtubeId: "Q_L2R3ISWZA",
  },
  {
    id: "id-yesus-segalanya",
    lang: "id",
    title: "Yesus Segalanya",
    artist: "NDC Worship",
    youtubeId: "vVQboVfRu-4",
  },
];

export const popularWorshipByLang = (lang: Lang): PopularSong[] =>
  popularWorshipSongs.filter((s) => s.lang === lang);
