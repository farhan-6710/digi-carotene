import { UserRound } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { ProjectManagerSelectProps } from "@/features/projects-management/types/components";
import { fetchProjectManagers } from "@/features/team-management/utils/teamMembersRepository";
import { ComboBox } from "@/shared/ui/ComboBox";

export function ProjectManagerSelect({
  value,
  onChange,
  disabled = false,
}: ProjectManagerSelectProps) {
  const [members, setMembers] = useState<
    Awaited<ReturnType<typeof fetchProjectManagers>>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadManagers = useCallback(() => {
    setIsLoading(true);
    fetchProjectManagers()
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setIsLoading(false));
  }, []);

  const options = useMemo(
    () =>
      members.map((member) => ({
        value: member.id,
        label: member.member_name,
        icon: <UserRound className="size-3.5 opacity-70" />,
      })),
    [members],
  );

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      placeholder="Select manager"
      listTitle="Select manager or admin"
      emptyMessage="No managers or admins found. Add a team member with manager or admin role first."
      noMatchMessage="No matching managers or admins found."
      mode="value"
      onOpenChange={(open) => {
        if (open && members.length === 0) {
          loadManagers();
        }
      }}
    />
  );
}
