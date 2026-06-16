import { useEffect } from "react";
import { useLocation } from "react-router";

import {
  getHashId,
  scrollToSectionWhenReady,
  scrollToTop,
} from "@/features/public/utils/scrollToSection";

export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    if (location.hash) {
      const id = getHashId(location.hash);
      if (id) scrollToSectionWhenReady(id);
      return;
    }

    scrollToTop();
  }, [location.pathname, location.hash]);
}
