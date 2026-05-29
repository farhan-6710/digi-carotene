import { Link } from "react-router";
import {
  clinicMeta,
  clinicStats,
  heroContent,
  serviceHighlights,
} from "@/constants/public";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {heroContent.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {heroContent.title}
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link to={heroContent.primaryCta.to}>
                  {heroContent.primaryCta.label}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to={heroContent.secondaryCta.to}>
                  {heroContent.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-semibold">{clinicMeta.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {clinicMeta.description}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {clinicStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-muted/30 p-4"
                >
                  <div className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Rehabilitation services
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Structured programmes designed to meet you where you are in your
            recovery journey.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {serviceHighlights.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/80 bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready to begin your recovery?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Learn more about our clinic approach or access the staff portal to
              manage appointments and sessions.
            </p>
          </div>
          <Button asChild className="rounded-full px-6">
            <Link to="/about">Learn about Reviva</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
