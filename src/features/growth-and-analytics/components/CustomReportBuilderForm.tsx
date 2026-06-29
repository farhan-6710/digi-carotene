import { Check } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/components/DatePicker";
import { cn } from "@/shared/lib/utils";

import { GrowthStaticComboBox } from "./GrowthStaticComboBox";
import {
  reportFormatOptions,
  reportMetrics,
  reportableAccounts,
} from "../constants/customReportData";
import type { CustomReportBuilderFormProps } from "../types/components";

function ToggleChip({
  label,
  caption,
  selected,
  onClick,
}: {
  label: string;
  caption?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      <span>
        <span className="block font-medium text-foreground">{label}</span>
        {caption ? (
          <span className="block text-xs text-muted-foreground">{caption}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-md border",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40",
        )}
      >
        {selected ? <Check className="size-3.5" /> : null}
      </span>
    </button>
  );
}

export function CustomReportBuilderForm({
  values,
  onToggleAccount,
  onToggleMetric,
  onFieldChange,
  onGenerate,
}: CustomReportBuilderFormProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-foreground">Accounts</h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Choose which accounts to include in the report.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {reportableAccounts.map((account) => (
              <ToggleChip
                key={account.id}
                label={account.label}
                caption={account.platform}
                selected={values.selectedAccountIds.includes(account.id)}
                onClick={() => onToggleAccount(account.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Metrics</h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Pick the metrics and sections to render.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {reportMetrics.map((metric) => (
              <ToggleChip
                key={metric.id}
                label={metric.label}
                selected={values.selectedMetricIds.includes(metric.id)}
                onClick={() => onToggleMetric(metric.id)}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <DatePicker
            label="Start date"
            value={values.startDate}
            onChange={(value) => onFieldChange("startDate", value)}
          />
          <DatePicker
            label="End date"
            value={values.endDate}
            onChange={(value) => onFieldChange("endDate", value)}
          />
          <GrowthStaticComboBox
            label="Format"
            value={values.format}
            options={reportFormatOptions}
            onChange={(value) => onFieldChange("format", value)}
            placeholder="Select format"
          />
        </section>

        <div className="flex justify-end border-t border-border/60 pt-4">
          <Button onClick={onGenerate} className="rounded-full">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
