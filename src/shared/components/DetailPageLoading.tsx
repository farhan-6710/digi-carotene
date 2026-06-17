import { PageHeader } from "@/shared/components/PageHeader";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import type { DetailPageLoadingProps } from "@/shared/types/components";

export function DetailPageLoading({
  backButton,
  minHeight = 320,
}: DetailPageLoadingProps) {
  return (
    <section className="space-y-4">
      {backButton ? <PageHeader backButton={backButton} /> : null}

      <div
        className="flex items-center justify-center"
        style={{ minHeight }}
      >
        <LoadingSpinner size="lg" />
      </div>
    </section>
  );
}
