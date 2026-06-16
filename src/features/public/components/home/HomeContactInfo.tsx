import { PublicSectionHeader } from "@/features/public/components/PublicSectionHeader";
import { contactDetails, contactSectionContent } from "@/features/public/constants/contact";
import { getContactDetailIcon } from "@/features/public/utils/publicIcons";

export function HomeContactInfo() {
  return (
    <div className="space-y-6 text-left">
      <PublicSectionHeader
        badge={contactSectionContent.badge}
        title={contactSectionContent.title}
        description={contactSectionContent.description}
      />

      <div className="space-y-4 pt-4">
        {contactDetails.map((detail) => {
          const Icon = getContactDetailIcon(detail.icon);

          return (
            <div key={detail.id} className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-card text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase">
                  {detail.label}
                </div>
                {detail.href ? (
                  <a href={detail.href} className="text-sm font-semibold hover:underline">
                    {detail.value}
                  </a>
                ) : (
                  <div className="text-sm font-semibold text-foreground">{detail.value}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
