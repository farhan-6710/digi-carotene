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

import { GrowthStaticComboBox } from "../GrowthStaticComboBox";
import { currencyOptions } from "../../constants/accountsData";
import type { AdAccountDialogProps } from "../../types/components";

export function AdAccountDialog({
  open,
  onOpenChange,
  isEditing,
  values,
  onFieldChange,
  onSave,
}: AdAccountDialogProps) {
  const canSave =
    values.clientName.trim() !== "" &&
    values.accountName.trim() !== "" &&
    values.adAccountId.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-lg! flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>
            {isEditing ? "Edit Ad Account" : "Connect Ad Account"}
          </DialogTitle>
          <DialogDescription>
            Link a Meta ad account to pull paid campaign performance.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-1 pr-1">
          <label className="block text-xs font-semibold text-muted-foreground">
            Client name
            <input
              value={values.clientName}
              onChange={(event) => onFieldChange("clientName", event.target.value)}
              placeholder="e.g. Armario Pro"
              className={formFieldClassName}
            />
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Ad account name
            <input
              value={values.accountName}
              onChange={(event) => onFieldChange("accountName", event.target.value)}
              placeholder="e.g. Armario Pro — Ads"
              className={formFieldClassName}
            />
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Ad account ID
            <input
              value={values.adAccountId}
              onChange={(event) => onFieldChange("adAccountId", event.target.value)}
              placeholder="e.g. act_1234567890"
              className={formFieldClassName}
            />
          </label>

          <GrowthStaticComboBox
            label="Currency"
            value={values.currency}
            options={currencyOptions}
            onChange={(value) => onFieldChange("currency", value)}
            placeholder="Select currency"
          />

          <label className="block text-xs font-semibold text-muted-foreground">
            Access token
            <input
              type="password"
              value={values.accessToken}
              onChange={(event) => onFieldChange("accessToken", event.target.value)}
              placeholder="Paste the system user access token"
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
