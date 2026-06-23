import { ProjectPostsTableRow } from "@/features/projects-management/components/ProjectPostsTableRow";
import { projectPostsDirectoryConfig } from "@/features/projects-management/constants/projectPostsDirectory";
import type { ProjectPostsTableProps } from "@/features/projects-management/types/components";
import { DirectoryTable } from "@/shared/components/DirectoryTable";

export function ProjectPostsTable({ posts, isLoading }: ProjectPostsTableProps) {
  return (
    <DirectoryTable
      title={projectPostsDirectoryConfig.title}
      description={projectPostsDirectoryConfig.description}
      gridClass={projectPostsDirectoryConfig.gridClass}
      columns={projectPostsDirectoryConfig.columns}
      emptyMessage={projectPostsDirectoryConfig.emptyMessage}
      isLoading={isLoading}
      isEmpty={posts.length === 0}
    >
      {posts.map((post) => (
        <ProjectPostsTableRow key={post.id} post={post} />
      ))}
    </DirectoryTable>
  );
}
