import { Children } from "react";
import { motion } from "framer-motion";

import {
  PAGE_STAGGER_CONTAINER,
  PAGE_STAGGER_ITEM,
} from "@/shared/constants/pageMotion";
import type { PageRevealProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";

export function PageReveal({ className, children }: PageRevealProps) {
  return (
    <motion.div
      className={className}
      variants={PAGE_STAGGER_CONTAINER}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function PageRevealItem({ className, children }: PageRevealProps) {
  return (
    <motion.div className={className} variants={PAGE_STAGGER_ITEM}>
      {children}
    </motion.div>
  );
}

/** Staggers each direct child — use for page sections or card grids. */
export function PageRevealGroup({ className, children }: PageRevealProps) {
  return (
    <PageReveal className={cn("space-y-8", className)}>
      {Children.toArray(children).map((child, index) => (
        <PageRevealItem key={index}>{child}</PageRevealItem>
      ))}
    </PageReveal>
  );
}

/** Page layout without PageHeader — same stagger as PageShell children. */
export const PageContent = PageRevealGroup;
