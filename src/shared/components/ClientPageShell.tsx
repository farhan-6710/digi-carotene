import { PageHeader } from "@/shared/components/PageHeader";
import { ErrorBanner } from "@/shared/components/ErrorBanner";
import type { ClientPageShellProps } from "@/shared/types/components";

export function ClientPageShell({
  heading,
  description,
  error = null,
  actions,
  children,
}: ClientPageShellProps) {
  return (
    <section className="space-y-8">
      <PageHeader
        heading={heading}
        description={description}
        actions={actions}
      />

      {error ? <ErrorBanner message={error} /> : null}

      {children}
    </section>
  );
}
