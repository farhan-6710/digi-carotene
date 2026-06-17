import { User } from "lucide-react";
import { useMemo } from "react";

import type { ClientComboboxProps } from "@/features/clients-management/types/components";
import { fetchClients } from "@/features/clients-management/utils/clientsRepository";
import { useLazyEntityList } from "@/shared/hooks/useLazyEntityList";
import { ComboBox } from "@/shared/ui/ComboBox";

export function ClientCombobox({
  value,
  onChange,
  disabled = false,
  activeClientIds = [],
  placeholder = "Search clients...",
  preload = false,
}: ClientComboboxProps) {
  const { items: clients, isLoading, handleOpenChange } = useLazyEntityList(
    fetchClients,
    { preload },
  );

  const options = useMemo(
    () =>
      clients
        .filter((client) => !activeClientIds.includes(client.id))
        .map((client) => ({
          value: client.id,
          label: client.client_name,
          icon: <User className="size-3.5 opacity-70" />,
        })),
    [activeClientIds, clients],
  );

  return (
    <ComboBox
      value={value}
      onChange={onChange}
      options={options}
      isLoading={isLoading}
      disabled={disabled}
      placeholder={placeholder}
      listTitle="Select client"
      emptyMessage="No clients left to assign."
      noMatchMessage="No matching clients found."
      mode="value"
      onOpenChange={handleOpenChange}
    />
  );
}
