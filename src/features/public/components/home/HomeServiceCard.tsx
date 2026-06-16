import { CheckCircle2 } from "lucide-react";

import type { HomeServiceCardProps } from "@/features/public/types/components";
import { getResponsiveCardClasses } from "@/features/public/utils/cardVariantUtils";
import { getServiceIcon } from "@/features/public/utils/publicIcons";

export function HomeServiceCard({ service, index }: HomeServiceCardProps) {
  const Icon = getServiceIcon(service.icon);
  const classes = getResponsiveCardClasses(index);

  return (
    <div className={`relative rounded-2xl border bg-card p-6 shadow-md ${classes.card}`}>
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${classes.icon}`}
      >
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className={`size-4 shrink-0 ${classes.checkIcon}`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
