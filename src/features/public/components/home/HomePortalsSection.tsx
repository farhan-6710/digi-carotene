import { HomePortalCard } from "@/features/public/components/home/HomePortalCard";
import { PublicSectionHeader } from "@/features/public/components/PublicSectionHeader";
import { portalCards, portalsSectionContent } from "@/features/public/constants/portals";

export function HomePortalsSection() {
  return (
    <section id="portals" className="border-b border-border py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <PublicSectionHeader
          badge={portalsSectionContent.badge}
          badgeVariant="accent"
          title={portalsSectionContent.title}
          description={portalsSectionContent.description}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {portalCards.map((portal) => (
            <HomePortalCard key={portal.id} portal={portal} />
          ))}
        </div>
      </div>
    </section>
  );
}
