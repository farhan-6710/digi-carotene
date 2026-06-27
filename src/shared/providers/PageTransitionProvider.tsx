import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, createPath, useLocation, useNavigate, type To } from "react-router";

import { PAGE_MAIN_MOTION } from "@/shared/constants/pageMotion";
import {
  PageTransitionContext,
  usePageTransition,
  type PageTransitionContextValue,
} from "@/shared/providers/pageTransitionContext";
import { routePath } from "@/shared/utils/routePath";

function isSameRoute(pathname: string, search: string, to: To) {
  return routePath(to) === createPath({ pathname, search }).split("?")[0];
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [activePath, setActivePath] = useState(location.pathname);
  const pendingTo = useRef<To | null>(null);

  const finishTransition = useCallback(
    (to: To) => {
      pendingTo.current = null;
      navigate(to);
      setIsVisible(true);
    },
    [navigate],
  );

  const navigateWithTransition = useCallback(
    (to: To) => {
      if (isSameRoute(location.pathname, location.search, to)) return;

      setActivePath(routePath(to));
      pendingTo.current = to;

      if (!isVisible) {
        finishTransition(to);
        return;
      }

      setIsVisible(false);
    },
    [finishTransition, isVisible, location.pathname, location.search],
  );

  const onExitComplete = useCallback(() => {
    if (!pendingTo.current) return;
    finishTransition(pendingTo.current);
  }, [finishTransition]);

  useEffect(() => {
    if (!pendingTo.current) {
      setIsVisible(true);
      setActivePath(location.pathname);
    }
  }, [location.key, location.pathname]);

  const value = useMemo<PageTransitionContextValue>(
    () => ({ navigateWithTransition, activePath, isVisible, onExitComplete }),
    [navigateWithTransition, activePath, isVisible, onExitComplete],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function PageTransitionMain({
  mainRef,
  className,
}: {
  mainRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const { pathname } = useLocation();
  const { isVisible, onExitComplete } = usePageTransition();

  useLayoutEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname, mainRef]);

  return (
    <main ref={mainRef} className={className}>
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        {isVisible ? (
          <motion.div key={pathname} {...PAGE_MAIN_MOTION}>
            <Outlet />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
