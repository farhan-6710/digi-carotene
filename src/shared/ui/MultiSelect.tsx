import { Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/shared/lib/utils";
import type { MultiSelectProps } from "@/shared/types/components";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function MultiSelect({
  id,
  value,
  onChange,
  options,
  isLoading = false,
  disabled = false,
  label,
  placeholder = "Select options",
  emptyMessage = "No options available.",
  excludeValues = [],
  fallbackSelectedLabel = "Selected",
  onOpenChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const labelByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option.label])),
    [options],
  );

  const availableOptions = useMemo(
    () => options.filter((option) => !excludeValues.includes(option.value)),
    [excludeValues, options],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const toggleValue = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((entry) => entry !== optionValue));
      return;
    }

    onChange([...value, optionValue]);
  };

  const trigger = (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className="h-auto w-full justify-between gap-2 rounded-lg border border-ring/60 bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs hover:bg-muted/50 dark:border-input dark:bg-muted/40"
        >
          <span className="flex flex-wrap items-center gap-1.5">
            {value.length === 0 ? (
              <span className="font-normal text-muted-foreground">{placeholder}</span>
            ) : (
              value.map((selectedValue) => (
                <span
                  key={selectedValue}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
                >
                  {labelByValue.get(selectedValue) ?? fallbackSelectedLabel}
                </span>
              ))
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-3.5 opacity-50 transition-transform",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) border-muted-foreground/10 p-2 shadow-xl"
        align="start"
      >
        {isLoading ? (
          <p className="px-3 py-2 text-sm text-muted-foreground">Loading...</p>
        ) : availableOptions.length === 0 ? (
          <p className="px-3 py-2 text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <div className="flex max-h-56 flex-col gap-1 overflow-y-auto">
            {availableOptions.map((option) => {
              const isSelected = value.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted/60",
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded border transition-colors",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40 bg-background",
                      )}
                    >
                      {isSelected ? <Check className="size-2.5 stroke-[3.5]" /> : null}
                    </span>
                    <span className="font-normal text-foreground">{option.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );

  if (!label) {
    return trigger;
  }

  return (
    <div className="space-y-2">
      <span className="block text-xs font-semibold text-muted-foreground">{label}</span>
      {trigger}
    </div>
  );
}
