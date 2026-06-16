import { ArrowRight, Lock, Users } from "lucide-react";
import { Link } from "react-router";

import type { HomePortalCardProps } from "@/features/public/types/components";
import { isPrimaryVariant } from "@/features/public/utils/cardVariantUtils";
import { getPortalFeatureIcon } from "@/features/public/utils/publicIcons";
import { Button } from "@/shared/ui/button";

export function HomePortalCard({ portal }: HomePortalCardProps) {
  const isPrimary = isPrimaryVariant(portal.variant);
  const HeaderIcon = isPrimary ? Users : Lock;

  return (
    <div
      className={`relative rounded-2xl border bg-card p-8 shadow-lg transition-all duration-300 ${
        isPrimary
          ? "border-primary/40 bg-glow-bg-primary"
          : "border-accent/40 bg-glow-bg-accent"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex size-12 items-center justify-center rounded-xl border ${
            isPrimary
              ? "border-primary/20 bg-primary text-primary-foreground"
              : "border-accent/20 bg-accent text-accent-foreground"
          }`}
        >
          <HeaderIcon className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">{portal.title}</h3>
          <p className="text-xs text-muted-foreground">{portal.subtitle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {portal.description}
      </p>
      <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
        {portal.features.map((feature) => {
          const Icon = getPortalFeatureIcon(feature.icon);
          return (
            <li key={feature.label} className="flex items-center gap-2">
              <Icon className={`size-4 ${isPrimary ? "text-primary" : "text-accent"}`} />
              {feature.label}
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <Button
          asChild
          variant={isPrimary ? "default" : "outline"}
          className={`w-full rounded-full py-6 font-semibold ${
            isPrimary ? "shadow-md" : "border-accent/30"
          }`}
        >
          <Link to={portal.ctaTo} className="flex items-center justify-center gap-2">
            {portal.ctaLabel}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
