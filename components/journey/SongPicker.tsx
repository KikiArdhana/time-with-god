"use client";

import { useState } from "react";
import { ExternalLink, Music2, Play } from "lucide-react";
import { popularWorshipByLang, type PopularSong } from "@/lib/content/popularWorship";
import type { Lang } from "@/lib/content/types";
import { useSettings } from "@/lib/store/settings-context";

export function SongPicker({ initialLang }: { initialLang: Lang }) {
  const { t } = useSettings();
  const [lang, setLang] = useState<Lang>(initialLang);
  const [song, setSong] = useState<PopularSong | null>(null);

  const songs = popularWorshipByLang(lang);

  return (
    <div>
      <div className="inline-flex rounded-full bg-paper p-1">
        {(["en", "id"] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setLang(l);
              setSong(null);
            }}
            aria-pressed={lang === l}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              lang === l ? "bg-cream text-ink shadow-soft" : "text-muted"
            }`}
          >
            {l === "en" ? t.settings.musicOptions.en : t.settings.musicOptions.id}
          </button>
        ))}
      </div>

      {song && (
        <div className="mt-4">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-card">
            <iframe
              key={song.id}
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?autoplay=1`}
              title={song.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-medium text-ink">{song.title}</p>
              <p className="text-sm text-muted">{song.artist}</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:underline"
            >
              {t.worship.watchOnYoutube}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {songs.map((s) => {
          const selected = song?.id === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setSong(s)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-2xl border bg-cream px-4 py-3 text-left transition-colors ${
                  selected ? "border-gold-400 bg-gold-50" : "border-line/70 hover:border-gold-200"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    selected ? "bg-gold-400 text-ink" : "bg-paper text-muted"
                  }`}
                >
                  {selected ? <Play size={15} /> : <Music2 size={15} />}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">{s.title}</span>
                  <span className="mt-0.5 block text-[13px] text-muted">{s.artist}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
