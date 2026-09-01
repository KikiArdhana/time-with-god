"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { WorshipTrack } from "@/lib/content/worship";
import { useSettings } from "@/lib/store/settings-context";

function clock(t: number): string {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function MusicPlayer({
  tracks,
  autoPlay,
}: {
  tracks: WorshipTrack[];
  autoPlay: boolean;
}) {
  const { t } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [loop, setLoop] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const track = tracks[index];

  const attemptPlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  // Load a track when the index changes; try to keep playing if we already were.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !track) return;
    setUnavailable(false);
    setCurrent(0);
    el.load();
    if (playing || autoPlay) attemptPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Attempt autoplay once on mount (worship is reached after user interaction).
  useEffect(() => {
    if (autoPlay) attemptPlay();
    return () => {
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      attemptPlay();
    }
  };

  const go = (delta: number) => {
    if (tracks.length === 0) return;
    setIndex((i) => (i + delta + tracks.length) % tracks.length);
  };

  const onEnded = () => {
    if (loop) {
      attemptPlay();
    } else if (tracks.length > 1) {
      go(1);
    } else {
      setPlaying(false);
    }
  };

  if (!track) {
    return (
      <p className="rounded-2xl bg-paper/70 px-4 py-3 text-sm text-muted">
        {t.worship.unavailable}
      </p>
    );
  }

  return (
    <div>
      {/* Artwork */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-300 via-gold-400 to-[#d9a24a]" />
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-lg leading-tight text-white drop-shadow">
            {track.title}
          </p>
          <p className="text-xs text-white/80">{track.artist}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onEnded={onEnded}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />

      {unavailable && (
        <p className="mt-3 rounded-xl bg-paper/70 px-3 py-2 text-xs text-muted">
          {t.worship.unavailable}
        </p>
      )}

      {/* Progress */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(current, duration || 0)}
          onChange={(e) => {
            const el = audioRef.current;
            if (el) {
              el.currentTime = Number(e.target.value);
              setCurrent(Number(e.target.value));
            }
          }}
          aria-label="Seek"
          className="w-full"
          disabled={unavailable}
        />
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-faint">
          <span>{clock(current)}</span>
          <span>{clock(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setLoop((v) => !v)}
          aria-pressed={loop}
          aria-label="Repeat"
          className={`transition-colors ${loop ? "text-gold-500" : "text-faint hover:text-muted"}`}
        >
          <Repeat size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          disabled={tracks.length < 2}
          className="text-ink disabled:opacity-30"
        >
          <SkipBack size={24} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.common.pause : t.common.resume}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-ink shadow-soft transition-colors hover:bg-gold-500"
        >
          {playing ? <Pause size={24} /> : <Play size={24} className="translate-x-[1px]" />}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          disabled={tracks.length < 2}
          className="text-ink disabled:opacity-30"
        >
          <SkipForward size={24} />
        </button>
        <div className="flex items-center text-faint">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </div>
      </div>

      {/* Volume */}
      <div className="mx-auto mt-3 flex max-w-[220px] items-center gap-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="w-full"
        />
      </div>
    </div>
  );
}
