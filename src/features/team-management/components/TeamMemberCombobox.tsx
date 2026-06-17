import { UserRound } from "lucide-react";
import { useMemo } from "react";

import type { TeamMemberComboboxProps } from "@/features/team-management/types/components";
import { fetchTeamMembers } from "@/features/team-management/utils/teamMembersRepository";
import { useLazyEntityList } from "@/shared/hooks/useLazyEntityList";
import { ComboBox } from "@/shared/ui/ComboBox";

export function TeamMemberCombobox({
  value,
  onChange,
  disabled = false,
  activeMemberIds = [],
  placeholder = "Search by name...",
  preload = false,
}: TeamMemberComboboxProps) {
  const { items: members, isLoading, handleOpenChange } = useLazyEntityList(
    fetchTeamMembers,
    { preload },
  );

  const options = useMemo(
    () =>
      members
        .filter((member) => !activeMemberIds.includes(member.id))
        .map((member) => ({
          value: member.id,
          label: member.member_name,
          icon: <UserRound className="size-3.5 opacity-70" />,
        })),
    [activeMemberIds, members],
  );

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      placeholder={placeholder}
      listTitle="Select"
      emptyMessage="No one available to assign."
      noMatchMessage="No matches found."
      mode="value"
      onOpenChange={handleOpenChange}
    />
  );
}
