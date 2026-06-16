import { Link } from "react-router";

import { SocialIcon } from "@/features/public/components/PublicSocialIcon";
import { agencyMeta } from "@/features/public/constants/agency";
import { socialLinks } from "@/features/public/constants/footer";

export function PublicFooterBrand() {
  return (
    <div className="space-y-4 sm:col-span-2">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
          D
        </span>
        {agencyMeta.name}
      </Link>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        {agencyMeta.description}
      </p>
      <div className="flex gap-3 pt-2">
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-8 items-center justify-center rounded-full border border-border/40 bg-muted/20 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            aria-label={social.label}
          >
            <SocialIcon platform={social.platform} className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
