"use client";

import type { ReactNode } from "react";
import { SettingsProvider } from "@/lib/store/settings-context";
import { SessionProvider } from "@/lib/store/session-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <SessionProvider>{children}</SessionProvider>
    </SettingsProvider>
  );
}
