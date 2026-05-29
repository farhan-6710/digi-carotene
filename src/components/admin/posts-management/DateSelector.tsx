import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateSelectorLabel } from "@/utils/admin/posts-management/calendarUtils";
import { cn } from "@/lib/utils";

type DateSelectorProps = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="default"
          className={cn(
            "h-auto gap-2 rounded-full border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted/50",
          )}
        >
          <CalendarIcon className="size-3.5 opacity-70" aria-hidden="true" />
          <span>{formatDateSelectorLabel(selectedDate)}</span>
          <ChevronDown className="size-3.5 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-muted-foreground/10 p-0 shadow-2xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate}
          onSelect={(date) => {
            if (!date) {
              return;
            }

            onSelect(date);
            setOpen(false);
          }}
          className="rounded-md border-none"
        />
      </PopoverContent>
    </Popover>
  );
}
