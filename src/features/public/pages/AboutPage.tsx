import { AboutCtaSection } from "@/features/public/components/about/AboutCtaSection";
import { AboutHeroSection } from "@/features/public/components/about/AboutHeroSection";
import { AboutSectionsGrid } from "@/features/public/components/about/AboutSectionsGrid";
import { AboutStatsSection } from "@/features/public/components/about/AboutStatsSection";
import { AboutValuesSection } from "@/features/public/components/about/AboutValuesSection";

export function AboutPage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutSectionsGrid />
      <AboutValuesSection />
      <AboutCtaSection />
    </div>
  );
}
