import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { HEADER_SCROLL_THRESHOLD_PX } from "@/features/public/constants/nav";
import {
  scrollToSectionWhenReady,
  scrollToTop,
} from "@/features/public/utils/scrollToSection";

export function usePublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD_PX);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
      setIsOpen(false);

      if (to === "/") {
        e.preventDefault();
        if (location.pathname !== "/" || location.hash) {
          navigate("/");
        }
        scrollToTop();
        return;
      }

      if (!to.startsWith("/#")) return;

      e.preventDefault();
      const id = to.slice(2);
      if (!id) return;

      if (location.pathname === "/") {
        navigate(`/#${id}`);
        scrollToSectionWhenReady(id);
        return;
      }

      navigate(`/#${id}`);
    },
    [location.pathname, location.hash, navigate],
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    scrolled,
    handleNavClick,
    toggleMenu,
  };
}
