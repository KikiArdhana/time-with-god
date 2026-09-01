"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function CircularTimer({
  seconds,
  autoStart = true,
  onComplete,
}: {
  seconds: number;
  autoStart?: boolean;
  onComplete?: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(autoStart);
  const doneRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(autoStart);
    doneRef.current = false;
  }, [seconds, autoStart]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0 && !doneRef.current) {
      doneRef.current = true;
      setRunning(false);
      onComplete?.();
    }
  }, [remaining, onComplete]);

  const size = 220;
  const stroke = 3;
  const r = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = seconds > 0 ? 1 - remaining / seconds : 1;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#EAE2D0"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#EAC24A"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl tabular-nums text-ink">
            {fmt(remaining)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRunning((v) => !v)}
        aria-label={running ? "Pause" : "Resume"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-cream text-ink shadow-soft transition-colors hover:border-gold-300"
      >
        {running ? <Pause size={20} /> : <Play size={20} className="translate-x-[1px]" />}
      </button>
    </div>
  );
}
