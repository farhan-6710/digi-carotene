import { SettingsSectionCard } from "@/features/settings/components/SettingsSectionCard";
import { useSettingsPreferences } from "@/features/settings/hooks/useSettingsPreferences";
import { PageContent } from "@/shared/components/PageReveal";
import { PageHeader } from "@/shared/components/PageHeader";

export function SettingsPage() {
  const { sections, isToggleEnabled, setToggleEnabled } =
    useSettingsPreferences();

  return (
    <PageContent>
      <PageHeader
        heading="Settings"
        description="Manage notifications, appearance, and workflow preferences for the Digi Carotene team portal."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <SettingsSectionCard
            key={section.id}
            section={section}
            isToggleEnabled={isToggleEnabled}
            onToggleChange={setToggleEnabled}
          />
        ))}
      </div>
    </PageContent>
  );
}
