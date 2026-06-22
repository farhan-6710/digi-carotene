import { ClientPostsTable } from "@/features/client-portal/components/ClientPostsTable";
import { useClientPortal } from "@/features/client-portal/providers/ClientPortalProvider";
import { ClientPageShell } from "@/shared/components/ClientPageShell";

export function ClientPostsPage() {
  const { posts, loading, error } = useClientPortal();

  return (
    <ClientPageShell
      heading="My Posts"
      description="Read-only view of every post scheduled for your brand."
      error={error && !loading ? error : null}
    >
      <ClientPostsTable posts={posts} isLoading={loading} />
    </ClientPageShell>
  );
}
