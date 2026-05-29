import { useEffect, useRef, useState } from "react";
import { ChevronDown, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { POST_AVAILABLE_TIMES } from "@/constants/admin/posts-management/postSchedule";
import { formatPostScheduleLabel } from "@/utils/admin/posts-management/postScheduleUtils";
import { cn } from "@/lib/utils";

type PostSchedulePickerProps = {
  year: number;
  month: number;
  date: number;
  selectedTime: string;
  onTimeChange: (time: string) => void;
  disabled?: boolean;
};

export function PostSchedulePicker({
  year,
  month,
  date,
  selectedTime,
  onTimeChange,
  disabled = false,
}: PostSchedulePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "h-auto w-full justify-between gap-2 rounded-lg border border-ring/60 bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs hover:bg-muted/50 dark:border-input dark:bg-muted/40",
        )}
      >
        <span className="flex items-center gap-2">
          <Clock3 className="size-3.5 opacity-70" aria-hidden="true" />
          {formatPostScheduleLabel(year, month, date, selectedTime)}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 opacity-50 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </Button>

      {open ? (
        <div
          role="listbox"
          aria-label="Available times"
          className="absolute bottom-[calc(100%+0.5rem)] left-0 z-50 w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-center text-sm font-medium">Select time</p>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {formatPostScheduleLabel(year, month, date, selectedTime)}
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto overscroll-contain p-4">
            <div className="grid grid-cols-1 gap-2">
              {POST_AVAILABLE_TIMES.map((time) => {
                const isSelected =
                  time.toLowerCase() === selectedTime.trim().toLowerCase();

                return (
                  <Button
                    key={time}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    className="w-full shrink-0 justify-center"
                    onClick={() => {
                      onTimeChange(time);
                      setOpen(false);
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
