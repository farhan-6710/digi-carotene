import { PublicFooterBrand } from "@/features/public/components/PublicFooterBrand";
import { PublicFooterLinks } from "@/features/public/components/PublicFooterLinks";
import { agencyMeta } from "@/features/public/constants/agency";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <PublicFooterBrand />
          <PublicFooterLinks />
        </div>

        <hr className="border-border/40" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {agencyMeta.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
