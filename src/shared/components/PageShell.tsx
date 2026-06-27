import { ErrorBanner } from "@/shared/components/ErrorBanner";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import type { PageShellProps } from "@/shared/types/components";

export function PageShell({
  heading,
  description,
  actions,
  error = null,
  children,
  dialog,
}: PageShellProps) {
  return (
    <PageContent>
      <PageHeader
        heading={heading}
        description={description}
        actions={actions}
      />

      {error ? <ErrorBanner message={error} /> : null}

      {children}

      {dialog}
    </PageContent>
  );
}
