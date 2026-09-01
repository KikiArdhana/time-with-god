"use client";

import type { ReactNode } from "react";
import { SettingsProvider } from "@/lib/store/settings-context";
import { SessionProvider } from "@/lib/store/session-context";
import { OnboardingProvider } from "@/lib/store/onboarding-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <OnboardingProvider>
        <SessionProvider>{children}</SessionProvider>
      </OnboardingProvider>
    </SettingsProvider>
  );
}
