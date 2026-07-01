import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import { GrowthPostProfileCard } from "../components/GrowthPostProfileCard";
import { GROWTH_CONTENT_PERFORMANCE_PATH } from "../constants/routes";
import { useGrowthPostDetailQuery } from "../hooks/useGrowthPostDetailQuery";
import { DetailPageLoading } from "@/shared/components/DetailPageLoading";
import { ErrorBanner } from "@/shared/components/ErrorBanner";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui/button";

function GrowthPostDetailBackButton() {
  return (
    <Button asChild variant="outline" className="rounded-full">
      <Link to={GROWTH_CONTENT_PERFORMANCE_PATH}>
        <ArrowLeft className="mr-2 size-4" />
        Back to content performance
      </Link>
    </Button>
  );
}

export function GrowthPostDetailPage() {
  const { postId = "" } = useParams();
  const { view, isLoading, error } = useGrowthPostDetailQuery(postId);

  if (isLoading) {
    return <DetailPageLoading backButton={<GrowthPostDetailBackButton />} />;
  }

  if (!view) {
    return (
      <section className="space-y-4">
        <PageHeader backButton={<GrowthPostDetailBackButton />} />
        <ErrorBanner message={error ?? "Post not found."} />
      </section>
    );
  }

  return (
    <PageContent>
      <PageHeader backButton={<GrowthPostDetailBackButton />} />

      {error ? <ErrorBanner message={error} /> : null}

      <GrowthPostProfileCard view={view} />
    </PageContent>
  );
}
