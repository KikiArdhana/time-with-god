"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchWebChapter, type ChapterResult } from "@/lib/content/bibleApi";
import { useSettings } from "@/lib/store/settings-context";
import type { Scripture } from "@/lib/content/types";

export function ScriptureReaderSheet({
  scripture,
  onClose,
}: {
  scripture: Scripture;
  onClose: () => void;
}) {
  const { t } = useSettings();
  const [state, setState] = useState<
    { status: "loading" } | { status: "error" } | { status: "ready"; chapter: ChapterResult }
  >({ status: "loading" });

  useEffect(() => {
    let active = true;
    setState({ status: "loading" });
    fetchWebChapter(scripture.book, scripture.chapter)
      .then((chapter) => {
        if (active) setState({ status: "ready", chapter });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, [scripture.book, scripture.chapter]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory animate-fade-in">
      <div className="app-frame flex min-h-[100dvh] w-full flex-col px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between py-2">
          <p className="font-display text-lg text-ink">{scripture.book} {scripture.chapter}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-2 flex-1 overflow-y-auto pb-6">
          {state.status === "loading" && (
            <p className="mt-8 text-center text-sm text-muted">{t.common.loading}</p>
          )}

          {state.status === "error" && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted">{t.scripture.loadError}</p>
              <a
                href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(
                  `${scripture.book} ${scripture.chapter}`,
                )}&version=WEB`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-medium text-gold-600 hover:underline"
              >
                {t.scripture.readFull}
              </a>
            </div>
          )}

          {state.status === "ready" && (
            <div className="space-y-2.5 text-[15.5px] leading-relaxed text-ink/90">
              {state.chapter.verses.map((v) => (
                <p key={v.v}>
                  <sup className="mr-1 align-super text-[11px] font-medium text-gold-600">
                    {v.v}
                  </sup>
                  {v.t}
                </p>
              ))}
              <p className="pt-4 text-xs text-faint">{scripture.translation.en}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
