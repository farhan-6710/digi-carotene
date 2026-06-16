import { Award } from "lucide-react";

import { PublicSectionBadge } from "@/features/public/components/PublicSectionBadge";
import { aboutContent, aboutHeroBadge } from "@/features/public/constants/about";

export function AboutHeroSection() {
  return (
    <section className="relative border-b border-border/40 py-20 lg:py-28">
      <div className="absolute top-1/4 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
        <PublicSectionBadge
          label={aboutHeroBadge}
          icon={<Award className="size-3.5" />}
        />
        <h1 className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          {aboutContent.title}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {aboutContent.intro}
        </p>
      </div>
    </section>
  );
}
