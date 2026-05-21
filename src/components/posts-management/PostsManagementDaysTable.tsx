import type { Slot, StatusKey, Week } from "@/types/PostsManagementPage/types";

type PostsManagementDaysTableProps = {
  days: string[];
  weeks: Week[];
  getSlot: (day: string, date: number) => Slot | undefined;
  onAdd: (day: string, date: number) => void;
  onEdit: (day: string, date: number, clientIndex: number) => void;
  statusColors: Record<StatusKey, string>;
  statusText: Record<StatusKey, string>;
};

export function PostsManagementDaysTable({
  days,
  weeks,
  getSlot,
  onAdd,
  onEdit,
  statusColors,
  statusText,
}: PostsManagementDaysTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-x-auto">
      <div className="min-w-[1120px]">
        <div className="grid grid-cols-[140px_repeat(7,minmax(0,1fr))] border-b border-border bg-muted text-xs font-semibold tracking-wider text-muted-foreground">
          <div className="px-4 py-3">Day</div>
          {days.map((day) => (
            <div key={day} className="px-4 py-3 text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="divide-y divide-border">
          {weeks.map((week) => (
            <div
              key={week.label}
              className="grid grid-cols-[140px_repeat(7,minmax(0,1fr))]"
            >
              <div className="flex items-center border-r border-border bg-muted/40 px-4 py-6 text-sm font-semibold">
                <div>
                  <div className="text-xs text-muted-foreground">
                    {week.label}
                  </div>
                  <div className="text-sm font-semibold">{week.range}</div>
                </div>
              </div>
              {days.map((day, dayIndex) => {
                const dateNumber = week.dates[dayIndex];
                const slot = getSlot(day, dateNumber);
                const hasClients = Boolean(slot?.clients.length);

                return (
                  <div
                    key={`${day}-${dateNumber}`}
                    role="button"
                    tabIndex={0}
                    className="group flex min-h-[140px] cursor-pointer flex-col border-r border-border/70 p-4 text-left transition hover:bg-muted/40"
                    aria-label={`Add post for ${day} May ${dateNumber}`}
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

                    <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
                      {hasClients ? (
                        slot?.clients.map((client, clientIndex) => (
                          <button
                            key={`${client.name}-${client.status}`}
                            type="button"
                            className="flex w-full items-center justify-between rounded-xl border border-border bg-background/70 px-3 py-2 text-left transition hover:border-ring/50"
                            onClick={(event) => {
                              event.stopPropagation();
                              onEdit(day, dateNumber, clientIndex);
                            }}
                            aria-label={`Edit ${client.name}`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`size-2 rounded-full ${statusColors[client.status]}`}
                              />
                              <span className="text-sm font-medium">
                                {client.name}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-semibold ${statusText[client.status]}`}
                            >
                              {client.status}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                          Click to add clients
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
    </div>
  );
}
