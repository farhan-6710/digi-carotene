import { useParams } from "react-router";

import { PlaceholderPage } from "./PlaceholderPage";

export function ProjectPage() {
  const { projectId } = useParams();

  return (
    <PlaceholderPage
      title={`Project ${projectId ?? ""}`.trim()}
      description="Example dynamic route (projects/:projectId)."
    />
  );
}
