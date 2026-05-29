import { Link } from "react-router";
import { aboutContent, clinicMeta } from "@/constants/public";
import { Button } from "@/components/ui/button";

export function AboutPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border/80">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {clinicMeta.tagline}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {aboutContent.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            {aboutContent.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-12 lg:px-8">
        {aboutContent.sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}

        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Our values
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {aboutContent.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/80 bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-8">
          <p className="text-sm text-muted-foreground">
            Clinicians can access appointments, analytics, and session tracking
            through the staff portal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/admin/dashboard">Open staff portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
