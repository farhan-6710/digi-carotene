import type { PublicSectionBadgeProps } from "@/features/public/types/components";
import { cn } from "@/shared/lib/utils";

export function PublicSectionBadge({
  label,
  variant = "primary",
  icon,
}: PublicSectionBadgeProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase",
        isPrimary
          ? "border-primary/20 bg-primary/5 text-primary"
          : "border-accent/20 bg-accent/5 text-accent",
      )}
    >
      {icon}
      {label}
    </div>
  );
}
