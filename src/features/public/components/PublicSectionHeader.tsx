import type { PublicSectionHeaderProps } from "@/features/public/types/components";
import { cn } from "@/shared/lib/utils";

import { PublicSectionBadge } from "@/features/public/components/PublicSectionBadge";

export function PublicSectionHeader({
  badge,
  badgeVariant = "primary",
  title,
  description,
  align = "left",
}: PublicSectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        isCenter ? "mx-auto text-center" : "text-left",
      )}
    >
      <PublicSectionBadge label={badge} variant={badgeVariant} />
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
