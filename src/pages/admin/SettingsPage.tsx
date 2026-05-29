import { SettingsSectionCard } from "@/components/settings/SettingsSectionCard";
import { useSettingsPreferences } from "@/hooks/useSettingsPreferences";

export function SettingsPage() {
  const { sections, isToggleEnabled, setToggleEnabled } =
    useSettingsPreferences();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage notifications, appearance, and clinic workflow preferences for
          the Reviva staff portal.
        </p>
      </div>

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
    </section>
  );
}
