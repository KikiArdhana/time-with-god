"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ONBOARDING_KEY = "twg.onboarding.v1";

interface OnboardingState {
  isComplete: boolean;
  name: string;
}

const DEFAULTS: OnboardingState = {
  isComplete: false,
  name: "",
};

interface OnboardingValue extends OnboardingState {
  hydrated: boolean;
  setName: (name: string) => void;
  complete: (name?: string) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Load stored onboarding state after mount (keeps SSR output deterministic).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ONBOARDING_KEY);
      if (raw) setState({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(ONBOARDING_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }));
  }, []);

  const complete = useCallback((name?: string) => {
    setState((prev) => ({ ...prev, isComplete: true, name: name ?? prev.name }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  const value = useMemo<OnboardingValue>(
    () => ({ ...state, hydrated, setName, complete, reset }),
    [state, hydrated, setName, complete, reset],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
