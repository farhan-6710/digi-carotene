import { DateRangePicker } from "@/shared/components/DateRangePicker";
import type { DateFiltersProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";

export function DateFilters({
  quickPeriods,
  activeQuickPeriod,
  isDateRangeActive,
  periodLabel,
  rangeButtonLabel,
  pickerRange,
  isPickerOpen,
  pickerError,
  onToggleQuickPeriod,
  onClearFilters,
  onClearDateRange,
  onApplyDateRange,
  onPickerRangeChange,
  onPickerOpenChange,
  onPickerKeyDown,
}: DateFiltersProps) {
  const isAllTime = activeQuickPeriod === null && !isDateRangeActive;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        onClick={onClearFilters}
        className={cn(
          "inline-flex h-7 cursor-pointer items-center rounded-full border px-2.5 text-[11px] font-medium transition-colors",
          isAllTime
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
      >
        All time
      </button>

      {quickPeriods.map((period) => {
        const isActive = activeQuickPeriod === period.id;

        return (
          <button
            key={period.id}
            type="button"
            onClick={() => onToggleQuickPeriod(period.id)}
            className={cn(
              "inline-flex h-7 cursor-pointer items-center rounded-full border px-2.5 text-[11px] font-medium transition-colors",
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {period.label}
          </button>
        );
      })}

      <DateRangePicker
        open={isPickerOpen}
        onOpenChange={onPickerOpenChange}
        range={pickerRange}
        rangeLabel={rangeButtonLabel}
        isActive={isDateRangeActive}
        onRangeChange={onPickerRangeChange}
        onApply={onApplyDateRange}
        onClear={onClearDateRange}
        onKeyDown={onPickerKeyDown}
        error={pickerError}
      />

      {!isAllTime ? (
        <span className="sr-only">Active period: {periodLabel}</span>
      ) : null}
    </div>
  );
}
