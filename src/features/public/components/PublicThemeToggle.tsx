import { Moon, Sun } from "lucide-react";

import { useThemePreference } from "@/features/admin-shell/providers/ThemePreferenceProvider";
import { Switch } from "@/shared/ui/switch";

export function PublicThemeToggle() {
  const { isDarkMode, setDarkMode } = useThemePreference();

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Sun className="size-4" aria-hidden="true" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={setDarkMode}
        aria-label="Toggle dark mode"
        className="cursor-pointer"
      />
      <Moon className="size-4" aria-hidden="true" />
    </div>
  );
}
