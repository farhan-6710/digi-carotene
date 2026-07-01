import { growthBasePath } from "./navigation";

export const GROWTH_CONTENT_PERFORMANCE_PATH = `${growthBasePath}/content-performance`;

export function buildGrowthPostDetailPath(postId: string): string {
  return `${GROWTH_CONTENT_PERFORMANCE_PATH}/posts/${postId}`;
}
