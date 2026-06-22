import { ClientPostsTableRow } from "@/features/client-portal/components/ClientPostsTableRow";
import { clientPostsDirectoryConfig } from "@/features/client-portal/constants/postsDirectory";
import type { ClientPostsTableProps } from "@/features/client-portal/types/components";
import { DirectoryTable } from "@/shared/components/DirectoryTable";

export function ClientPostsTable({ posts, isLoading }: ClientPostsTableProps) {
  return (
    <DirectoryTable
      title={clientPostsDirectoryConfig.title}
      description={clientPostsDirectoryConfig.description}
      gridClass={clientPostsDirectoryConfig.gridClass}
      columns={clientPostsDirectoryConfig.columns}
      emptyMessage={clientPostsDirectoryConfig.emptyMessage}
      isLoading={isLoading}
      isEmpty={posts.length === 0}
    >
      {posts.map((post) => (
        <ClientPostsTableRow key={post.id} post={post} />
      ))}
    </DirectoryTable>
  );
}
