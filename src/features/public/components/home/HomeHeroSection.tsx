import { HomeHeroContent } from "@/features/public/components/home/HomeHeroContent";
import { HomeHeroDashboard } from "@/features/public/components/home/HomeHeroDashboard";

export function HomeHeroSection() {
  return (
    <section className="relative border-b border-border py-20 lg:py-32">
      <div className="absolute top-1/4 left-1/10 -z-10 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 -z-10 size-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <HomeHeroContent />
        <HomeHeroDashboard />
      </div>
    </section>
  );
}
