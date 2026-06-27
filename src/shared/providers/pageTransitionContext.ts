import { createContext, useContext } from "react";
import type { To } from "react-router";

export type PageTransitionContextValue = {
  navigateWithTransition: (to: To) => void;
  activePath: string;
  isVisible: boolean;
  onExitComplete: () => void;
};

export const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return context;
}
