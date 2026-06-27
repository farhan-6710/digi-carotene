import { createContext, useContext } from "react";

export type TeamReviewerAccessContextValue = {
  managesProject: boolean;
  canReview: boolean;
  pendingCount: number;
  reload: () => Promise<void>;
};

export const TeamReviewerAccessContext =
  createContext<TeamReviewerAccessContextValue | null>(null);

export function useTeamReviewerAccess(): TeamReviewerAccessContextValue {
  const context = useContext(TeamReviewerAccessContext);
  if (!context) {
    throw new Error(
      "useTeamReviewerAccess must be used within TeamReviewerAccessProvider.",
    );
  }

  return context;
}
