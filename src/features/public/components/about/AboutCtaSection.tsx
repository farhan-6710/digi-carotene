import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { aboutCtaContent } from "@/features/public/constants/about";
import { Button } from "@/shared/ui/button";

export function AboutCtaSection() {
  return (
    <section className="relative bg-card/50 py-20 lg:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {aboutCtaContent.title}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {aboutCtaContent.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 py-5 font-semibold transition-colors hover:bg-muted/50"
          >
            <Link to={aboutCtaContent.homeCta.to} className="flex items-center gap-1.5">
              <ArrowLeft className="size-4" />
              {aboutCtaContent.homeCta.label}
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-full px-6 py-5 font-semibold shadow-md transition-all duration-300 hover:shadow-primary/20"
          >
            <Link to={aboutCtaContent.portalCta.to} className="flex items-center gap-1.5">
              {aboutCtaContent.portalCta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
