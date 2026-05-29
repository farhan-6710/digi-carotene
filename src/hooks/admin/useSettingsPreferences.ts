import { useCallback, useMemo, useState } from "react";

import { settingsSections } from "@/constants/admin/settings/settings";
import { useThemePreference } from "@/providers/admin/ThemePreferenceProvider";
import type { SettingsToggleId } from "@/types/admin/settings/types";

function buildInitialToggleState() {
  const initialState: Record<SettingsToggleId, boolean> = {
    "appointment-reminders": false,
    "no-show-alerts": false,
    "daily-schedule-digest": false,
    "patient-outcome-reports": false,
    "dark-theme": false,
    "compact-sidebar": false,
    "auto-save-notes": false,
    "anonymized-analytics": false,
  };

  for (const section of settingsSections) {
    for (const toggle of section.toggles) {
      initialState[toggle.id] = toggle.defaultEnabled;
    }
  }

  return initialState;
}

export function useSettingsPreferences() {
  const { isDarkMode, setDarkMode } = useThemePreference();
  const [toggleState, setToggleState] = useState(buildInitialToggleState);

  const isToggleEnabled = useCallback(
    (id: SettingsToggleId) => {
      if (id === "dark-theme") return isDarkMode;
      return toggleState[id];
    },
    [isDarkMode, toggleState],
  );

  const setToggleEnabled = useCallback(
    (id: SettingsToggleId, enabled: boolean) => {
      if (id === "dark-theme") {
        setDarkMode(enabled);
        return;
      }

      setToggleState((current) => ({ ...current, [id]: enabled }));
    },
    [setDarkMode],
  );

  return useMemo(
    () => ({
      sections: settingsSections,
      isToggleEnabled,
      setToggleEnabled,
    }),
    [isToggleEnabled, setToggleEnabled],
  );
}
