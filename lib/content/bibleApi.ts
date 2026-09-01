// Fetches a full chapter of the World English Bible (public domain) from
// bible-api.com so it can be read in-app instead of redirecting out to an
// external site. English only: Indonesian Scripture text is intentionally
// never sourced live (see types.ts) to avoid displaying an unofficial
// translation, so the full-chapter reader falls back to an external link
// for the "id" language.
export interface ChapterVerse {
  v: number;
  t: string;
}

export interface ChapterResult {
  reference: string;
  verses: ChapterVerse[];
}

interface BibleApiVerse {
  verse: number;
  text: string;
}

interface BibleApiResponse {
  reference: string;
  verses: BibleApiVerse[];
}

export async function fetchWebChapter(book: string, chapter: number): Promise<ChapterResult> {
  const passage = encodeURIComponent(`${book} ${chapter}`);
  const res = await fetch(`https://bible-api.com/${passage}?translation=web`);
  if (!res.ok) throw new Error(`Failed to load ${book} ${chapter}`);
  const data: BibleApiResponse = await res.json();
  return {
    reference: data.reference,
    verses: data.verses.map((v) => ({ v: v.verse, t: v.text.trim() })),
  };
}
