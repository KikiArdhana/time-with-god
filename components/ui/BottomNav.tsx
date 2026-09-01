"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, NotebookPen, CalendarHeart, Settings } from "lucide-react";
import { useSettings } from "@/lib/store/settings-context";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useSettings();

  const items = [
    { href: "/", label: t.nav.today, Icon: Sun },
    { href: "/journal", label: t.nav.journal, Icon: NotebookPen },
    { href: "/history", label: t.nav.moments, Icon: CalendarHeart },
    { href: "/settings", label: t.nav.settings, Icon: Settings },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40">
      <div className="app-frame px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-stretch justify-around rounded-2xl border border-line/70 bg-cream/95 py-2 shadow-card backdrop-blur">
          {items.map(({ href, label, Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors ${
                  active ? "text-ink" : "text-faint hover:text-muted"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={active ? 2.2 : 1.8}
                  className={active ? "text-gold-500" : ""}
                />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
