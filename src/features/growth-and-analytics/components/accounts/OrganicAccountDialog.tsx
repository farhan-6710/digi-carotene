import { Button } from "@/shared/ui/button";
import { formFieldClassName } from "@/shared/constants/formStyles";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { platformOptions } from "../../constants/accountsData";
import type { OrganicAccountDialogProps } from "../../types/components";
import type { GrowthPlatform } from "../../types/types";

export function OrganicAccountDialog({
  open,
  onOpenChange,
  isEditing,
  values,
  onFieldChange,
  onSave,
}: OrganicAccountDialogProps) {
  const canSave =
    values.accountName.trim() !== "" && values.accountId.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-lg! flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>
            {isEditing ? "Edit Organic Account" : "Connect Organic Account"}
          </DialogTitle>
          <DialogDescription>
            Link an Instagram or Facebook account to pull organic insights.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-1 pr-1">
          <label className="block text-xs font-semibold text-muted-foreground">
            Platform
            <select
              value={values.platform}
              onChange={(event) =>
                onFieldChange("platform", event.target.value as GrowthPlatform)
              }
              className={formFieldClassName}
            >
              {platformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Account name
            <input
              value={values.accountName}
              onChange={(event) => onFieldChange("accountName", event.target.value)}
              placeholder="e.g. Armario Pro"
              className={formFieldClassName}
            />
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Account ID
            <input
              value={values.accountId}
              onChange={(event) => onFieldChange("accountId", event.target.value)}
              placeholder="e.g. 17841400000000001"
              className={formFieldClassName}
            />
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Access token
            <input
              type="password"
              value={values.accessToken}
              onChange={(event) => onFieldChange("accessToken", event.target.value)}
              placeholder="Paste the page access token"
              className={formFieldClassName}
            />
          </label>
        </div>

        <DialogFooter className="shrink-0 border-t border-border/60 pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onSave} disabled={!canSave} className="rounded-full">
            {isEditing ? "Save Changes" : "Connect Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
