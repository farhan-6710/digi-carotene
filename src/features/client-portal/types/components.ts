import type { Post } from "@/features/posts-management/types/types";
import type { ProjectListItem } from "@/features/projects-management/types/types";

export type ClientPostsTableProps = {
  posts: Post[];
  isLoading: boolean;
};

export type ClientPostsTableRowProps = {
  post: Post;
};

export type ClientSocialLinksProps = {
  projects: ProjectListItem[];
};
