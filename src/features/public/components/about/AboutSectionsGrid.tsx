import { aboutContent } from "@/features/public/constants/about";
import { getSectionIcon } from "@/features/public/utils/publicIcons";

export function AboutSectionsGrid() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20 lg:px-8 lg:py-32">
      <div className="grid gap-8 md:grid-cols-3">
        {aboutContent.sections.map((section) => {
          const Icon = getSectionIcon(section.title);

          return (
            <div
              key={section.title}
              className="group relative rounded-2xl border border-border/40 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-glow-bg-primary"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
