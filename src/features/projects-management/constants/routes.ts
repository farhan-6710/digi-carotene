export const PROJECTS_MANAGEMENT_PATH = "/staff-portal/projects-management";

export function buildProjectDetailPath(projectId: string): string {
  return `${PROJECTS_MANAGEMENT_PATH}/${projectId}`;
}
