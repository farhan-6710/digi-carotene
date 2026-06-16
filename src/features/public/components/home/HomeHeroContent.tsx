import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

import { PublicSectionBadge } from "@/features/public/components/PublicSectionBadge";
import { heroContent } from "@/features/public/constants/hero";
import { scrollToSection } from "@/features/public/utils/scrollToSection";
import { Button } from "@/shared/ui/button";

export function HomeHeroContent() {
  return (
    <div className="space-y-6 text-left">
      <PublicSectionBadge
        label={heroContent.eyebrow}
        icon={<Sparkles className="size-3.5" />}
      />
      <h1 className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
        {heroContent.title}
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {heroContent.description}
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Button
          asChild
          className="rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-primary/25"
        >
          <a
            href={heroContent.primaryCta.to}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
          >
            {heroContent.primaryCta.label}
            <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:bg-muted/50"
        >
          <Link to={heroContent.secondaryCta.to}>{heroContent.secondaryCta.label}</Link>
        </Button>
      </div>
    </div>
  );
}
