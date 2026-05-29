import { Switch } from "@/components/ui/switch";
import type { SettingsSection, SettingsToggleId } from "@/types/Settings/types";

type SettingToggleRowProps = {
  id: SettingsToggleId;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SettingToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: SettingToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 last:pb-0">
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
        className="mt-0.5 shrink-0 cursor-pointer"
      />
    </div>
  );
}

type SettingsSectionCardProps = {
  section: SettingsSection;
  isToggleEnabled: (id: SettingsToggleId) => boolean;
  onToggleChange: (id: SettingsToggleId, enabled: boolean) => void;
};

export function SettingsSectionCard({
  section,
  isToggleEnabled,
  onToggleChange,
}: SettingsSectionCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {section.description}
        </p>
      </div>

      <div className="divide-y divide-border">
        {section.toggles.map((toggle) => (
          <SettingToggleRow
            key={toggle.id}
            id={toggle.id}
            label={toggle.label}
            description={toggle.description}
            checked={isToggleEnabled(toggle.id)}
            onCheckedChange={(checked) => onToggleChange(toggle.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}
