import { useCallback, useEffect, useState } from "react";

import type { Post } from "@/features/posts-management/types/types";
import { fetchPostsForProjectId } from "@/features/posts-management/utils/postsRepository";
import type { ProjectListItem } from "@/features/projects-management/types/types";
import { fetchProjectById } from "@/features/projects-management/utils/projectsRepository";

export function useProjectDetailQuery(projectId: string) {
  const [project, setProject] = useState<ProjectListItem | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!projectId) {
      setProject(null);
      setPosts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [projectRow, postRows] = await Promise.all([
        fetchProjectById(projectId),
        fetchPostsForProjectId(projectId),
      ]);

      setProject(projectRow);
      setPosts(postRows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    project,
    posts,
    isLoading,
    error,
    reload,
  };
}
