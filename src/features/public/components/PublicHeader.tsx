import { Menu, X } from "lucide-react";

import { PublicHeaderActions } from "@/features/public/components/PublicHeaderActions";
import { PublicHeaderLogo } from "@/features/public/components/PublicHeaderLogo";
import { PublicHeaderMobileMenu } from "@/features/public/components/PublicHeaderMobileMenu";
import { PublicHeaderNav } from "@/features/public/components/PublicHeaderNav";
import { usePublicHeader } from "@/features/public/hooks/usePublicHeader";

export function PublicHeader() {
  const { isOpen, scrolled, handleNavClick, toggleMenu } = usePublicHeader();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/40 backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <PublicHeaderLogo />
        <PublicHeaderNav onNavClick={handleNavClick} />
        <PublicHeaderActions />

        <button
          onClick={toggleMenu}
          className="flex size-10 items-center justify-center rounded-full border border-border/40 bg-muted/30 text-foreground transition-colors hover:bg-muted/60 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <PublicHeaderMobileMenu isOpen={isOpen} onNavClick={handleNavClick} />
    </header>
  );
}
