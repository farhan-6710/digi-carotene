import { HomeContactSection } from "@/features/public/components/home/HomeContactSection";
import { HomeHeroSection } from "@/features/public/components/home/HomeHeroSection";
import { HomePortalsSection } from "@/features/public/components/home/HomePortalsSection";
import { HomeServicesSection } from "@/features/public/components/home/HomeServicesSection";

export function HomePage() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <HomeHeroSection />
      <HomeServicesSection />
      <HomePortalsSection />
      <HomeContactSection />
    </div>
  );
}
