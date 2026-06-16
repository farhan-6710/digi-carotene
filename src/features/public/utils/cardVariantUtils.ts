import type { ServiceColor } from "@/features/public/types/types";

/** Alternates primary/accent in a checkerboard for 2-column grids. */
export function getCheckerboardVariant(index: number): ServiceColor {
  return (Math.floor(index / 2) + index) % 2 === 0 ? "primary" : "accent";
}

/** Alternates by row index for single-column (mobile) layouts. */
export function getStackedVariant(index: number): ServiceColor {
  return index % 2 === 0 ? "primary" : "accent";
}

export function isPrimaryVariant(variant: ServiceColor) {
  return variant === "primary";
}

export type ResponsiveCardClasses = {
  card: string;
  icon: string;
  checkIcon: string;
};

function primaryCard(prefix = "") {
  return `${prefix}border-primary/40 ${prefix}bg-glow-bg-primary`;
}

function accentCard(prefix = "") {
  return `${prefix}border-accent/40 ${prefix}bg-glow-bg-accent`;
}

function primaryIcon(prefix = "") {
  return `${prefix}border-primary/20 ${prefix}bg-primary ${prefix}text-primary-foreground`;
}

function accentIcon(prefix = "") {
  return `${prefix}border-accent/20 ${prefix}bg-accent ${prefix}text-accent-foreground`;
}

/** Mobile: stacked alternation. sm+: checkerboard for 2-column grids. */
export function getResponsiveCardClasses(index: number): ResponsiveCardClasses {
  const mobilePrimary = isPrimaryVariant(getStackedVariant(index));
  const desktopPrimary = isPrimaryVariant(getCheckerboardVariant(index));

  if (mobilePrimary === desktopPrimary) {
    return mobilePrimary
      ? { card: primaryCard(), icon: primaryIcon(), checkIcon: "text-primary" }
      : { card: accentCard(), icon: accentIcon(), checkIcon: "text-accent" };
  }

  return mobilePrimary
    ? {
        card: `${primaryCard()} ${accentCard("sm:")}`,
        icon: `${primaryIcon()} ${accentIcon("sm:")}`,
        checkIcon: "text-primary sm:text-accent",
      }
    : {
        card: `${accentCard()} ${primaryCard("sm:")}`,
        icon: `${accentIcon()} ${primaryIcon("sm:")}`,
        checkIcon: "text-accent sm:text-primary",
      };
}
