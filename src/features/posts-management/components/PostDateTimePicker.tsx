import { PostTimeSelect } from "@/features/posts-management/components/PostTimeSelect";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/components/DatePicker";
import {
  formatOptionalPostScheduleLabel,
  formatPostScheduleLabel,
} from "@/features/posts-management/utils/postScheduleUtils";
import type { PostDateTimePickerProps } from "@/features/posts-management/types/components";
import { parseUrlDateParam, serializeUrlDate } from "@/shared/utils/urlDateParams";
import { X } from "lucide-react";

export function PostDateTimePicker({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
}: PostDateTimePickerProps) {
  const displayLabel = value
    ? formatPostScheduleLabel(value.year, value.month, value.day, value.time)
    : formatOptionalPostScheduleLabel(null, null, null, null);

  const dateValue = value
    ? serializeUrlDate(new Date(value.year, value.month - 1, value.day))
    : "";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="block text-xs font-semibold text-muted-foreground">
          {label}
        </span>
        {!required && value ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="h-auto px-2 py-1 text-[11px] text-muted-foreground"
            onClick={() => onChange(null)}
            disabled={disabled}
          >
            <X className="size-3" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <DatePicker
          value={dateValue}
          onChange={(nextDate) => {
            const date = parseUrlDateParam(nextDate);
            if (!date) {
              return;
            }

            onChange({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              time: value?.time ?? "",
            });
          }}
          disabled={disabled}
        />

        <PostTimeSelect
          selectedTime={value?.time ?? ""}
          summaryLabel={displayLabel}
          listLabel={`${label} times`}
          disabled={disabled || !value}
          onTimeChange={(time) => {
            if (!value) {
              return;
            }

            onChange({ ...value, time });
          }}
        />
      </div>
    </div>
  );
}
