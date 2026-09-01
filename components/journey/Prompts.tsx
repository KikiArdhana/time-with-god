"use client";

import type { TextareaHTMLAttributes } from "react";
import { Heart } from "lucide-react";
import type { Lang, Prompt } from "@/lib/content/types";

export function PromptList({ prompts, lang }: { prompts: Prompt[]; lang: Lang }) {
  return (
    <ul className="space-y-2.5">
      {prompts.map((p) => (
        <li key={p.id} className="flex items-start gap-3 text-[15px] text-ink/90">
          <Heart size={15} className="mt-1 shrink-0 text-gold-400" fill="#F5D058" />
          <span>{p.text[lang]}</span>
        </li>
      ))}
    </ul>
  );
}

export function SoftTextarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-[120px] w-full resize-none rounded-2xl border border-line/70 bg-cream p-4 text-[15px] leading-relaxed text-ink placeholder:text-faint focus:border-gold-300 ${className}`}
      {...props}
    />
  );
}
