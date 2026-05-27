import type { Slot, TaskStatusKey, Week } from "@/types/TasksManagementPage/types";

type TasksManagementWeeksTableProps = {
  days: string[];
  weeks: Week[];
  getSlot: (day: string, date: number) => Slot | undefined;
  onAdd: (day: string, date: number) => void;
  onEdit: (day: string, date: number, taskIndex: number) => void;
  statusColors: Record<TaskStatusKey, string>;
  statusText: Record<TaskStatusKey, string>;
};

export function TasksManagementWeeksTable({
  days,
  weeks,
  getSlot,
  onAdd,
  onEdit,
  statusColors,
  statusText,
}: TasksManagementWeeksTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-[140px_repeat(4,minmax(0,1fr))] border-b border-border bg-muted text-xs font-semibold tracking-wider text-muted-foreground">
        <div className="px-4 py-3">Day</div>
        {weeks.map((week) => (
          <div key={week.label} className="px-4 py-3 text-center">
            <div>{week.label}</div>
            <div className="text-[11px] text-muted-foreground">
              {week.range}
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-border">
        {days.map((day, dayIndex) => (
          <div
            key={day}
            className="grid grid-cols-[140px_repeat(4,minmax(0,1fr))]"
          >
            <div className="flex items-center border-r border-border bg-muted/40 px-4 py-6 text-sm font-semibold">
              {day}
            </div>
            {weeks.map((week) => {
              const dateNumber = week.dates[dayIndex];
              const slot = getSlot(day, dateNumber);
              const hasTasks = Boolean(slot?.tasks.length);

              return (
                <div
                  key={`${day}-${week.label}-${dateNumber}`}
                  role="button"
                  tabIndex={0}
                  className="group flex min-h-[360px] cursor-pointer flex-col border-r border-border/70 p-4 text-left transition hover:bg-muted/40"
                  aria-label={`Add task for ${day} May ${dateNumber}`}
                  onClick={() => onAdd(day, dateNumber)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onAdd(day, dateNumber);
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Date</span>
                    <span className="font-mono">May {dateNumber}</span>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col gap-1.5">
                    {hasTasks ? (
                      slot?.tasks.map((task, taskIndex) => (
                        <button
                          key={`${task.name}-${task.time}-${taskIndex}`}
                          type="button"
                          className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/70 px-3 py-1.5 text-left transition hover:border-ring/50"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(day, dateNumber, taskIndex);
                          }}
                          aria-label={`Edit ${task.name}`}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`size-2 shrink-0 rounded-full ${statusColors[task.status]}`}
                            />
                            <span className="truncate text-sm font-medium">
                              {task.name}
                            </span>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-0.5">
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {task.time}
                            </span>
                            <span
                              className={`text-[11px] font-semibold ${statusText[task.status]}`}
                            >
                              {task.status}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        Click to add tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
